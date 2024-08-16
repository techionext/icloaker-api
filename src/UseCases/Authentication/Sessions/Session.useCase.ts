import { IRepositoryUsers } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/AppError/AppError';
import { generateToken } from '@shared/Util/configToken/generateToken';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';

import { ISessionUserDTO } from './DTO/ISessionDTO';

@injectable()
export class SessionUseCase {
  constructor(@inject('RepositoryUsers') private RepositoryUsers: IRepositoryUsers) {}

  async execute({ idUser }: ISessionUserDTO) {
    const { data: resDataUser, isExists } = await this.RepositoryUsers.FindUserById({ id: idUser });
    if (!isExists || !resDataUser)
      throw new AppError(ErrorDictionary.AUTH.invalidEmailOrPassword.message, 401, ErrorDictionary.AUTH.invalidEmailOrPassword.codeIntern);

    const token = generateToken({
      id: resDataUser.id,
      email: resDataUser.email,
      googleEmail: resDataUser.googleEmail,
    });

    const { password: passNotUser, ...restDataUser } = resDataUser;

    return {
      ...restDataUser,
      token,
    };
  }
}
