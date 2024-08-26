import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { getUserPermissions } from '@shared/permissions/getUserPermissions';
import { AppError } from '@shared/Util/Errors/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { CollaboratorGetSchema } from './CollaboratorGet.Schema';
import { ICollaboratorGetDTO } from './DTO/ICollaboratorGetDTO';

@injectable()
export class CollaboratorGetUseCase {
  constructor(@inject('RepositoryUser') private RepositoryUser: IRepositoryUser) {}

  async execute(request: ICollaboratorGetDTO.Params) {
    const { page, pageSize, token, filter } = ZODVerifyParse({
      schema: CollaboratorGetSchema,
      data: request,
    });

    const { data: dataAuth } = await this.RepositoryUser.GetById({ id: token.id });
    if (!dataAuth) throw new AppError(ErrorDictionary.USER.dataNotFound);

    const { cannot } = getUserPermissions({ role: dataAuth.role, userId: dataAuth.id });

    if (cannot('get', 'User')) throw new AppError(ErrorDictionary.COLLABORATOR.noPermissionToList);

    const { data, meta } = await this.RepositoryUser.Get({ page, pageSize, filter, onlyCollaborators: true });

    const returnResponse = {
      data,
      meta,
    };

    return returnResponse;
  }
}
