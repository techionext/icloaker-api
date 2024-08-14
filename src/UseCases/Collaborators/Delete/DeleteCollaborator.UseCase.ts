import { IRepositoryUsers } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { getUserPermissions } from '@shared/permissions/getUserPermissions';
import { userPermissions } from '@shared/permissions/models/user';
import { AppError } from '@shared/Util/AppError/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { DeleteCollaboratorSchema } from './DeleteCollaborator.Schema';
import { IDeleteCollaboratorDTO } from './DTO/IDeleteCollaboratorDTO';

@injectable()
export class DeleteCollaboratorUseCase {
  constructor(@inject('RepositoryUsers') private RepositoryUsers: IRepositoryUsers) {}

  async execute(request: IDeleteCollaboratorDTO.Params) {
    const { id, token } = ZODVerifyParse({
      schema: DeleteCollaboratorSchema,
      data: request,
    });

    const { data: dataAuth } = await this.RepositoryUsers.FindUserById({ id: token.id });
    if (!dataAuth) throw new AppError(ErrorDictionary.USER.dataNotFound.message, 401, ErrorDictionary.USER.dataNotFound.codeIntern);

    const { data: dataUserDel } = await this.RepositoryUsers.FindUserById({ id });
    if (!dataUserDel)
      throw new AppError(
        ErrorDictionary.COLLABORATOR.collaboratorIdNotFound.message,
        400,
        ErrorDictionary.COLLABORATOR.collaboratorIdNotFound.codeIntern,
      );

    const { cannot } = getUserPermissions({ role: dataAuth.role, userId: dataAuth.id });
    const user = userPermissions({ id, role: dataUserDel.role });

    if (cannot('delete', user))
      throw new AppError(
        ErrorDictionary.COLLABORATOR.noPermissionToDelete.message,
        401,
        ErrorDictionary.COLLABORATOR.noPermissionToDelete.codeIntern,
      );

    await this.RepositoryUsers.DisableById({ id });

    const returnResponse = {
      ...ErrorDictionary.COLLABORATOR.deletedSuccessfully,
    };

    return returnResponse;
  }
}
