import { IRepositoryUsers } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { getUserPermissions } from '@shared/permissions/getUserPermissions';
import { AppError } from '@shared/Util/AppError/AppError';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { IGetCollaboratorsDTO } from './DTO/IGetCollaboratorsDTO';
import { GetCollaboratorsSchema } from './GetCollaborators.Schema';

@injectable()
export class GetCollaboratorsUseCase {
  constructor(@inject('RepositoryUsers') private RepositoryUsers: IRepositoryUsers) {}

  async execute(request: IGetCollaboratorsDTO.Params) {
    const { page, pageSize, token, filter } = ZODVerifyParse({
      schema: GetCollaboratorsSchema,
      data: request,
    });

    const { data: dataAuth } = await this.RepositoryUsers.FindUserById({ id: token.id });
    if (!dataAuth) throw new AppError('Dados do usuário não encontrado !');

    const { cannot } = getUserPermissions({ role: dataAuth.role, userId: dataAuth.id });

    if (cannot('get', 'User')) throw new AppError('Sem permissão para listar os colaboradores !');

    const { data, meta } = await this.RepositoryUsers.Get({ page, pageSize, filter, onlyCollaborators: true });

    const returnResponse = {
      data,
      meta,
    };

    return returnResponse;
  }
}
