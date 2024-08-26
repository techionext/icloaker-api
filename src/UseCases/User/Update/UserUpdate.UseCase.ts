import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/Errors/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { IUserUpdateDTO } from './DTO/IUserUpdateDTO';
import { UserUpdateSchema } from './UserUpdate.Schema';

@injectable()
export class UserUpdateUseCase {
  constructor(@inject('RepositoryUser') private RepositoryUser: IRepositoryUser) {}

  async execute(request: IUserUpdateDTO.Params) {
    const { token, id, name, phone, role } = ZODVerifyParse({
      schema: UserUpdateSchema,
      data: request,
    });

    const { data: dataAuth } = await this.RepositoryUser.GetById({ id: token.id });
    if (!dataAuth) throw new AppError(ErrorDictionary.USER.dataNotFound);

    if ((id !== dataAuth.id && dataAuth.role !== 'ROOT') || ((role === 'ROOT' || role === 'ADMIN') && dataAuth.role !== 'ROOT'))
      throw new AppError(ErrorDictionary.USER.updatePermissionDenied);

    const { isExists } = await this.RepositoryUser.FindById({ id });
    if (!isExists) throw new AppError(ErrorDictionary.USER.dataNotFound);

    await this.RepositoryUser.Update({ id, name, phone, role });

    const returnResponse = {
      ...ErrorDictionary.USER.profileUpdated,
    };

    return returnResponse;
  }
}
