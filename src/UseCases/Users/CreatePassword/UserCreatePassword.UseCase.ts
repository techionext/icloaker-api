import { IRepositoryUsers } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/AppError/AppError';
import { handleCreateHash } from '@shared/Util/configHashPassword/handleCreatehash';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { IUserCreatePasswordDTO } from './DTO/IUserCreatePasswordDTO';
import { UserCreatePasswordSchema } from './UserCreatePassword.Schema';

@injectable()
export class UserCreatePasswordUseCase {
  constructor(@inject('RepositoryUsers') private RepositoryUsers: IRepositoryUsers) {}

  async execute(request: IUserCreatePasswordDTO.Params) {
    const { token, password } = ZODVerifyParse({
      schema: UserCreatePasswordSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUsers.FindUserById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound.message, 401, ErrorDictionary.USER.dataNotFound.codeIntern);

    if (dataUser.password)
      throw new AppError(ErrorDictionary.USER.passwordAlreadyExists.message, 400, ErrorDictionary.USER.passwordAlreadyExists.codeIntern);

    await this.RepositoryUsers.UpdatePassword({ id: dataUser.id, password: handleCreateHash(password) });

    const returnResponse = {
      ...ErrorDictionary.USER.passwordCreatedSuccessfully,
    };

    return returnResponse;
  }
}
