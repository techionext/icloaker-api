import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/AppError/AppError';
import { handleCreateHash } from '@shared/Util/configHashPassword/handleCreatehash';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { IUserAddLocalCredentialsDTO } from './DTO/IUserAddLocalCredentialsDTO';
import { UserAddLocalCredentialsSchema } from './UserAddLocalCredentials.Schema';

@injectable()
export class UserAddLocalCredentialsUseCase {
  constructor(@inject('RepositoryUser') private RepositoryUser: IRepositoryUser) {}

  async execute(request: IUserAddLocalCredentialsDTO.Params) {
    const { token, email, password } = ZODVerifyParse({
      schema: UserAddLocalCredentialsSchema,
      data: request,
    });

    const { data: dataAuth } = await this.RepositoryUser.GetById({ id: token.id });
    if (!dataAuth) throw new AppError(ErrorDictionary.USER.dataNotFound);

    if (dataAuth.email || dataAuth.password) throw new AppError(ErrorDictionary.USER.loginCredentialsExists);

    await this.RepositoryUser.UpdateCredentials({ email, id: dataAuth.id, password: handleCreateHash(password) });

    const returnResponse = {
      ...ErrorDictionary.USER.loginCredentialsSuccess,
    };

    return returnResponse;
  }
}
