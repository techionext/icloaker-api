import { IRepositoryUsers } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/AppError/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { IUsersUpdateDTO } from './DTO/IUsersUpdateDTO';
import { UsersUpdateSchema } from './UsersUpdate.Schema';

@injectable()
export class UsersUpdateUseCase {
  constructor(@inject('RepositoryUsers') private RepositoryUsers: IRepositoryUsers) {}

  async execute(request: IUsersUpdateDTO.Params) {
    const { token, id, role, email, name, phone } = ZODVerifyParse({
      schema: UsersUpdateSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUsers.FindUserById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound.message, 401, ErrorDictionary.USER.dataNotFound.codeIntern);

    const { data: dataUserToUpdate } = await this.RepositoryUsers.FindUserById({ id });
    if (!dataUserToUpdate)
      throw new AppError(ErrorDictionary.USER.userNotFoundWithId.message, 400, ErrorDictionary.USER.userNotFoundWithId.codeIntern);

    if ((dataUserToUpdate.id !== id && dataUser.role !== 'ROOT') || ((role === 'ROOT' || role === 'ADMIN') && dataUser.role !== 'ROOT'))
      throw new AppError(ErrorDictionary.USER.noPermissionToUpdateUser.message, 400, ErrorDictionary.USER.noPermissionToUpdateUser.codeIntern);

    await this.RepositoryUsers.Update({ id, email, name, role, phone });

    const returnResponse = {
      ...ErrorDictionary.USER.userUpdatedSuccessfully,
    };

    return returnResponse;
  }
}
