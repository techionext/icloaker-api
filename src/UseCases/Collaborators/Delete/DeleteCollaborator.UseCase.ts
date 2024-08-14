import { IRepositoryUsers } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { getUserPermissions } from '@shared/permissions/getUserPermissions';
import { userPermissions } from '@shared/permissions/models/user';
import { AppError } from '@shared/Util/AppError/AppError';
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
    if (!dataAuth) throw new AppError('Dados do usuário não encontrado !');

    const { data: dataUserDel } = await this.RepositoryUsers.FindUserById({ id });
    if (!dataUserDel) throw new AppError('Não existe um usuário com esse id !');

    const { cannot } = getUserPermissions({ role: dataAuth.role, userId: dataAuth.id });
    const user = userPermissions({ id, role: dataUserDel.role });

    if (cannot('delete', user)) throw new AppError('Sem permissão para deletar colaboradores !');

    await this.RepositoryUsers.DisableById({ id });

    const returnResponse = {
      message: 'Este usuário foi deletado !',
    };

    return returnResponse;
  }
}
