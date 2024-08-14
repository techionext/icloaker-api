import { IRepositoryUsers } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { getUserPermissions } from '@shared/permissions/getUserPermissions';
import { userPermissions } from '@shared/permissions/models/user';
import { AppError } from '@shared/Util/AppError/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { IUpdateCollaboratorDTO } from './DTO/IUpdateCollaboratorDTO';
import { UpdateCollaboratorSchema } from './UpdateCollaborator.Schema';

@injectable()
export class UpdateCollaboratorUseCase {
  constructor(@inject('RepositoryUsers') private RepositoryUsers: IRepositoryUsers) {}

  async execute(request: IUpdateCollaboratorDTO.Params) {
    const { id, token, role } = ZODVerifyParse({
      schema: UpdateCollaboratorSchema,
      data: request,
    });

    const { data: dataAuth } = await this.RepositoryUsers.FindUserById({ id: token.id });
    if (!dataAuth) throw new AppError(ErrorDictionary.USER.dataNotFound.message, 401, ErrorDictionary.USER.dataNotFound.codeIntern);

    const { data: dataUserUpdate } = await this.RepositoryUsers.FindUserById({ id });
    if (!dataUserUpdate)
      throw new AppError(
        ErrorDictionary.COLLABORATOR.collaboratorIdNotFound.message,
        400,
        ErrorDictionary.COLLABORATOR.collaboratorIdNotFound.codeIntern,
      );

    const { cannot } = getUserPermissions({ role: dataAuth.role, userId: dataAuth.id });
    const user = userPermissions({ id: dataUserUpdate.id, role: role ?? dataUserUpdate.role });

    if (cannot('update', user))
      throw new AppError(
        ErrorDictionary.COLLABORATOR.noPermissionToUpdate.message,
        400,
        ErrorDictionary.COLLABORATOR.noPermissionToUpdate.codeIntern,
      );

    if (role === 'ADMIN' && dataAuth.role !== 'ADMIN')
      throw new AppError(
        ErrorDictionary.COLLABORATOR.noPermissionToUpdateToAdmin.message,
        400,
        ErrorDictionary.COLLABORATOR.noPermissionToUpdateToAdmin.codeIntern,
      );

    await this.RepositoryUsers.Update({ id: dataUserUpdate.id, role });

    const returnResponse = {
      ...ErrorDictionary.COLLABORATOR.updatedSuccessfully,
    };

    return returnResponse;
  }
}
