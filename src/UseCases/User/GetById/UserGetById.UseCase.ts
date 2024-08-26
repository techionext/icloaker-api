import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/Errors/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { IUserGetByIdDTO } from './DTO/IUserGetByIdDTO';
import { UserGetByIdSchema } from './UserGetById.Schema';

@injectable()
export class UserGetByIdUseCase {
  constructor(@inject('RepositoryUser') private RepositoryUser: IRepositoryUser) {}

  async execute(request: IUserGetByIdDTO.Params) {
    const { token, id } = ZODVerifyParse({
      schema: UserGetByIdSchema,
      data: request,
    });

    const { data: dataAuth } = await this.RepositoryUser.GetById({ id: token.id });
    if (!dataAuth) throw new AppError(ErrorDictionary.USER.dataNotFound);

    if (id !== dataAuth.id && dataAuth.role !== 'ROOT') throw new AppError(ErrorDictionary.USER.errorPermissionView);

    // eslint-disable-next-line no-unused-vars
    const { password, ...data } = dataAuth;

    const returnResponse = { data };

    return returnResponse;
  }
}
