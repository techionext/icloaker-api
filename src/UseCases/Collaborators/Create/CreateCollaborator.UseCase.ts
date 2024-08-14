import { IRepositoryUsers } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { handleGeneratePassword } from '@shared/features/generatePassword/generatePassword';
import { handleGenerateUuid } from '@shared/features/handleGenerateUuid/handleGenerateUuid';
import { getUserPermissions } from '@shared/permissions/getUserPermissions';
import { userPermissions } from '@shared/permissions/models/user';
import { AppError } from '@shared/Util/AppError/AppError';
import { handleCreateHash } from '@shared/Util/configHashPassword/handleCreatehash';
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
    if (!dataUser) throw new AppError('Dados do usuário não encontrado !');

    const userId = handleGenerateUuid();

    const { cannot } = getUserPermissions({ role: dataUser.role, userId: dataUser.id });
    const user = userPermissions({ id: userId, role: 'COLLABORATOR' });

    if (cannot('create', user)) throw new AppError('Sem permissão para criar um colaborador !');

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
      message: 'Colaborador criado com sucesso !',
    };

    return returnResponse;
  }
}
