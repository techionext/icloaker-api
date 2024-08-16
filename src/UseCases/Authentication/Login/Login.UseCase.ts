import { IRepositoryUsers } from 'Repositories/User/IRepositoryUser';
import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/Util/AppError/AppError';
import { handleCreateHash } from '@shared/Util/configHashPassword/handleCreatehash';
import { generateToken } from '@shared/Util/configToken/generateToken';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';

import { ILoginDTO } from './DTO/ILoginDTO';

@injectable()
export class LoginUseCase {
  constructor(@inject('RepositoryUsers') private repositoryUser: IRepositoryUsers) {}

  async execute({ email, password }: ILoginDTO) {
    if (!email.length) throw new AppError(ErrorDictionary.AUTH.emailRequired.message, 422, ErrorDictionary.AUTH.emailRequired.codeIntern);
    if (!password.length) throw new AppError(ErrorDictionary.AUTH.passwordRequired.message, 422, ErrorDictionary.AUTH.passwordRequired.codeIntern);

    const { isExists: isExistsUser, data: resDataUser } = await this.repositoryUser.FindUserByEmail({ email, onlyActive: true });

    if (!resDataUser?.password) throw new AppError('Esse email foi registrado pelo google, tente fazer login pelo google');

    if (!isExistsUser || !resDataUser?.id)
      throw new AppError(ErrorDictionary.AUTH.invalidEmailOrPassword.message, 401, ErrorDictionary.AUTH.invalidEmailOrPassword.codeIntern);

    const hashPassoWord = handleCreateHash(password);
    if (hashPassoWord !== resDataUser.password)
      throw new AppError(ErrorDictionary.AUTH.invalidEmailOrPassword.message, 401, ErrorDictionary.AUTH.invalidEmailOrPassword.codeIntern);

    const token = generateToken({ email, id: resDataUser.id, googleEmail: resDataUser.googleEmail });

    const { password: passNotUser, ...restDataUser } = resDataUser;

    const returnResponse = {
      ...restDataUser,
      token,
    };

    return returnResponse;
  }
}
