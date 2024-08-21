import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { handleGenerateUuid } from '@shared/features/handleGenerateUuid/handleGenerateUuid';
import { AppError } from '@shared/Util/AppError/AppError';
import { handleCreateHash } from '@shared/Util/configHashPassword/handleCreatehash';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { IUserCreateDTO } from './DTO/IUserCreateDTO';
import { UserCreateSchema } from './UserCreate.Schema';

@injectable()
export class UserCreateUseCase {
  constructor(@inject('RepositoryUser') private RepositoryUser: IRepositoryUser) {}

  async execute(request: IUserCreateDTO.Params) {
    const { email, name, password, phone } = ZODVerifyParse({
      schema: UserCreateSchema,
      data: request,
    });

    const { isExists } = await this.RepositoryUser.FindByEmail({
      email,
    });
    if (isExists) throw new AppError(ErrorDictionary.USER.emailAlreadyExists);

    const id = handleGenerateUuid();
    const hashPassword = handleCreateHash(password);

    await this.RepositoryUser.Create({
      id,
      name,
      phone,
      email,
      password: hashPassword,
    });

    const returnResponse = {
      ...ErrorDictionary.USER.userCreatedSuccessfully,
    };

    return returnResponse;
  }
}
