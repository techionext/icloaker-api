import { IRepositoryUsers } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/AppError/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { IUsersGetByIdDTO } from './DTO/IUsersGetByIdDTO';
import { UsersGetByIdSchema } from './UsersGetById.Schema';

@injectable()
export class UsersGetByIdUseCase {
  constructor(@inject('RepositoryUsers') private RepositoryUsers: IRepositoryUsers) {}

  async execute(request: IUsersGetByIdDTO.Params) {
    const { token, id } = ZODVerifyParse({
      schema: UsersGetByIdSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUsers.FindUserById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound.message, 401, ErrorDictionary.USER.dataNotFound.codeIntern);

    const { data, isExists } = await this.RepositoryUsers.FindUserById({ id });
    if (!isExists) throw new AppError(ErrorDictionary.USER.dataNotFound.message, 400, ErrorDictionary.USER.dataNotFound.codeIntern);

    if (data?.id !== id && dataUser.role !== 'ROOT')
      throw new AppError(ErrorDictionary.USER.dataNotFound.message, 401, ErrorDictionary.USER.dataNotFound.codeIntern);

    const returnResponse = { data };

    return returnResponse;
  }
}
