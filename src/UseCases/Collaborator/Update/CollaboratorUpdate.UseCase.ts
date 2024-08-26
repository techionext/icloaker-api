import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { getUserPermissions } from '@shared/permissions/getUserPermissions';
import { userPermissions } from '@shared/permissions/models/user';
import { AppError } from '@shared/Util/Errors/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { CollaboratorUpdateSchema } from './CollaboratorUpdate.Schema';
import { ICollaboratorUpdateDTO } from './DTO/ICollaboratorUpdateDTO';

@injectable()
export class CollaboratorUpdateUseCase {
  constructor(@inject('RepositoryUser') private RepositoryUser: IRepositoryUser) {}

  async execute(request: ICollaboratorUpdateDTO.Params) {
    const { id, token, role } = ZODVerifyParse({
      schema: CollaboratorUpdateSchema,
      data: request,
    });

    const { data: dataAuth } = await this.RepositoryUser.GetById({ id: token.id });
    if (!dataAuth) throw new AppError(ErrorDictionary.USER.dataNotFound);

    const { data: dataUserUpdate } = await this.RepositoryUser.GetById({ id });
    if (!dataUserUpdate) throw new AppError(ErrorDictionary.COLLABORATOR.collaboratorNotFound);

    const { cannot } = getUserPermissions({ role: dataAuth.role, userId: dataAuth.id });
    const user = userPermissions({ id: dataUserUpdate.id, role: role ?? dataUserUpdate.role });

    if (cannot('update', user)) throw new AppError(ErrorDictionary.COLLABORATOR.noPermissionToUpdate);

    if (role === 'ADMIN' && dataAuth.role !== 'ADMIN') throw new AppError(ErrorDictionary.COLLABORATOR.noPermissionToUpdateToAdmin);

    await this.RepositoryUser.ChangeRole({ id: dataUserUpdate.id, role });

    const returnResponse = {
      ...ErrorDictionary.COLLABORATOR.updated,
    };

    return returnResponse;
  }
}
