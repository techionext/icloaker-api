import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { getUserPermissions } from '@shared/permissions/getUserPermissions';
import { userPermissions } from '@shared/permissions/models/user';
import { AppError } from '@shared/Util/Errors/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { CollaboratorDeleteSchema } from './CollaboratorDelete.Schema';
import { ICollaboratorDeleteDTO } from './DTO/ICollaboratorDeleteDTO';

@injectable()
export class CollaboratorDeleteUseCase {
  constructor(@inject('RepositoryUser') private RepositoryUser: IRepositoryUser) {}

  async execute(request: ICollaboratorDeleteDTO.Params) {
    const { id, token } = ZODVerifyParse({
      schema: CollaboratorDeleteSchema,
      data: request,
    });

    const { data: dataAuth } = await this.RepositoryUser.GetById({ id: token.id });
    if (!dataAuth) throw new AppError(ErrorDictionary.USER.dataNotFound);

    const { data: dataUserDel } = await this.RepositoryUser.GetById({ id });
    if (!dataUserDel) throw new AppError(ErrorDictionary.COLLABORATOR.collaboratorNotFound);

    const { cannot } = getUserPermissions({ role: dataAuth.role, userId: dataAuth.id });
    const user = userPermissions({ id, role: dataUserDel.role });

    if (cannot('delete', user)) throw new AppError(ErrorDictionary.COLLABORATOR.noPermissionToRemove);

    await this.RepositoryUser.DisableById({ id });

    const returnResponse = {
      ...ErrorDictionary.COLLABORATOR.userNoLongerInCompany,
    };

    return returnResponse;
  }
}
