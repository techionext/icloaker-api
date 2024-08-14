import { IRepositoryUsers } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { handleGenerateUuid } from '@shared/features/handleGenerateUuid/handleGenerateUuid';
import { AppError } from '@shared/Util/AppError/AppError';
import { handleCreateHash } from '@shared/Util/configHashPassword/handleCreatehash';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { CreateUserSchema } from './CreateUser.Schema';
import { ICreateUserDTO } from './DTO/ICreateUserDTO';

@injectable()
export class CreateUserUseCase {
  constructor(@inject('RepositoryUsers') private RepositoryUsers: IRepositoryUsers) {}

  async execute(request: ICreateUserDTO.Params) {
    const { email, name, password, phone } = ZODVerifyParse({
      schema: CreateUserSchema,
      data: request,
    });

    const id = handleGenerateUuid();

    const { isExists } = await this.RepositoryUsers.FindUserByEmail({
      email,
    });
    if (isExists) throw new AppError(ErrorDictionary.USER.emailAlreadyExists.message, 400, ErrorDictionary.USER.emailAlreadyExists.codeIntern);

    const hashPassword = handleCreateHash(password);

    await this.RepositoryUsers.Create({
      id,
      name,
      phone,
      email,
      password: hashPassword,
    });

    const returnResponse = {
      ...ErrorDictionary.USER.createdSuccessfully,
    };

    return returnResponse;
  }
}
