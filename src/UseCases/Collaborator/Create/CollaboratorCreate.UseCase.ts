import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { handleGeneratePassword } from '@shared/features/generatePassword/generatePassword';
import { handleGenerateUuid } from '@shared/features/handleGenerateUuid/handleGenerateUuid';
import { getUserPermissions } from '@shared/permissions/getUserPermissions';
import { userPermissions } from '@shared/permissions/models/user';
import { AppError } from '@shared/Util/AppError/AppError';
import { handleCreateHash } from '@shared/Util/configHashPassword/handleCreatehash';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { CollaboratorCreateSchema } from './CollaboratorCreate.Schema';
import { ICollaboratorCreateDTO } from './DTO/ICollaboratorCreateDTO';

@injectable()
export class CollaboratorCreateUseCase {
  constructor(@inject('RepositoryUser') private RepositoryUser: IRepositoryUser) {}

  async execute(request: ICollaboratorCreateDTO.Params) {
    const { name, email, token, phone } = ZODVerifyParse({
      schema: CollaboratorCreateSchema,
      data: request,
    });

    const { data: dataAuth } = await this.RepositoryUser.GetById({ id: token.id });
    if (!dataAuth) throw new AppError(ErrorDictionary.USER.dataNotFound);

    const userId = handleGenerateUuid();

    const { cannot } = getUserPermissions({ role: dataAuth.role, userId: dataAuth.id });
    const user = userPermissions({ id: userId, role: 'COLLABORATOR' });

    if (cannot('create', user)) throw new AppError(ErrorDictionary.COLLABORATOR.noPermissionToCreate, 401);

    const { isExists: isExistsWithEmail } = await this.RepositoryUser.FindByEmail({ email });
    if (!isExistsWithEmail) {
      const password = handleGeneratePassword({ limit: 10 });

      await this.RepositoryUser.Create({
        name,
        phone,
        email,
        id: userId,
        password: handleCreateHash(password),
      });

      // implementar envio de email para o usuário
    }

    const returnResponse = {
      ...ErrorDictionary.COLLABORATOR.created,
    };

    return returnResponse;
  }
}
