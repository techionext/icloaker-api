import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/Errors/AppError';
import { handleCreateHash } from '@shared/Util/configHashPassword/handleCreatehash';
import { generateToken } from '@shared/Util/configToken/generateToken';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { AuthLoginSchema } from './AuthLogin.Schema';
import { IAuthLoginDTO } from './DTO/IAuthLoginDTO';

@injectable()
export class AuthLoginUseCase {
  constructor(@inject('RepositoryUser') private RepositoryUser: IRepositoryUser) {}

  async execute(request: IAuthLoginDTO.Params) {
    const { email, password } = ZODVerifyParse({
      schema: AuthLoginSchema,
      data: request,
    });

    const { isExists: isExistsUser, data: resDataUser } = await this.RepositoryUser.GetByEmail({ email, onlyActive: true });
    if (!isExistsUser || !resDataUser?.id) throw new AppError(ErrorDictionary.AUTH.invalidEmailOrPassword, 401);

    const hashPassword = handleCreateHash(password);
    if (hashPassword !== resDataUser.password) throw new AppError(ErrorDictionary.AUTH.invalidEmailOrPassword, 401);

    const token = generateToken({ email, id: resDataUser.id });

    // eslint-disable-next-line no-unused-vars
    const { password: passNotUser, ...restDataUser } = resDataUser;

    const returnResponse = {
      ...restDataUser,
      token,
    };

    return returnResponse;
  }
}
