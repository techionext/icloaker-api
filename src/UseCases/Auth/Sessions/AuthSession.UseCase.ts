import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/Errors/AppError';
import { generateToken } from '@shared/Util/configToken/generateToken';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { AuthSessionSchema } from './AuthSession.Schema';
import { IAuthSessionDTO } from './DTO/IAuthSessionDTO';

@injectable()
export class AuthSessionUseCase {
  constructor(@inject('RepositoryUser') private RepositoryUser: IRepositoryUser) {}

  async execute(request: IAuthSessionDTO.Params) {
    const { token } = ZODVerifyParse({
      schema: AuthSessionSchema,
      data: request,
    });

    const { data: resDataUser, isExists } = await this.RepositoryUser.GetById({ id: token.id });
    if (!isExists || !resDataUser) throw new AppError(ErrorDictionary.AUTH.invalidEmailOrPassword, 401);

    const newToken = generateToken({
      email: resDataUser.email,
      id: resDataUser.id,
    });

    // eslint-disable-next-line no-unused-vars
    const { password: passNotUser, ...restDataUser } = resDataUser;

    return {
      ...restDataUser,
      token: newToken,
    };
  }
}
