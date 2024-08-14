import { IRepositoryUsers } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { handleGeneratePassword } from '@shared/features/generatePassword/generatePassword';
import { handleGenerateUuid } from '@shared/features/handleGenerateUuid/handleGenerateUuid';
import { getUserPermissions } from '@shared/permissions/getUserPermissions';
import { userPermissions } from '@shared/permissions/models/user';
import { AppError } from '@shared/Util/AppError/AppError';
import { handleCreateHash } from '@shared/Util/configHashPassword/handleCreatehash';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { CreateCollaboratorSchema } from './CreateCollaborator.Schema';
import { ICreateCollaboratorDTO } from './DTO/ICreateCollaboratorDTO';

@injectable()
export class CreateCollaboratorUseCase {
  constructor(@inject('RepositoryUsers') private RepositoryUsers: IRepositoryUsers) {}

  async execute(request: ICreateCollaboratorDTO.Params) {
    const { name, email, token, phone } = ZODVerifyParse({
      schema: CreateCollaboratorSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUsers.FindUserById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound.message, 401, ErrorDictionary.USER.dataNotFound.codeIntern);

    const userId = handleGenerateUuid();

    const { cannot } = getUserPermissions({ role: dataUser.role, userId: dataUser.id });
    const user = userPermissions({ id: userId, role: 'COLLABORATOR' });

    if (cannot('create', user))
      throw new AppError(
        ErrorDictionary.COLLABORATOR.noPermissionToCreate.message,
        401,
        ErrorDictionary.COLLABORATOR.noPermissionToCreate.codeIntern,
      );

    const { data: dataAlreadyUser } = await this.RepositoryUsers.FindUserByEmail({ email });
    if (!dataAlreadyUser) {
      const password = handleGeneratePassword({ limit: 10 });

      await this.RepositoryUsers.Create({
        name,
        phone,
        email,
        id: userId,
        password: handleCreateHash(password),
      });

      // implementar envio de email para o Usuario
    }

    const returnResponse = {
      ...ErrorDictionary.COLLABORATOR.createdSuccessfully,
    };

    return returnResponse;
  }
}
