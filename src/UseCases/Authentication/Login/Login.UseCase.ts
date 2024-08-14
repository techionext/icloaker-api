import { IRepositoryUsers } from 'Repositories/User/IRepositoryUser';
import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/Util/AppError/AppError';
import { handleCreateHash } from '@shared/Util/configHashPassword/handleCreatehash';
import { generateToken } from '@shared/Util/configToken/generateToken';

import { ILoginDTO } from './DTO/ILoginDTO';

@injectable()
export class LoginUseCase {
  constructor(@inject('RepositoryUsers') private repositoryUser: IRepositoryUsers) {}

  async execute({ email, password }: ILoginDTO) {
    if (!email.length) throw new AppError('Enviar email', 422);
    if (!password.length) throw new AppError('Enviar senha', 422);

    const { isExists: isExistsUser, data: resDataUser } = await this.repositoryUser.FindUserByEmail({ email, onlyActive: true });

    if (!isExistsUser || !resDataUser?.id) throw new AppError('Email/Senha incorreto', 401);

    const hashPassoWord = handleCreateHash(password);
    if (hashPassoWord !== resDataUser.password) throw new AppError('Email/Senha incorreto', 401);

    const token = generateToken({ email, id: resDataUser.id });

    const { password: passNotUser, ...restDataUser } = resDataUser;

    const returnResponse = {
      ...restDataUser,
      token,
    };

    return returnResponse;
  }
}
