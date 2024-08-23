import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { handleGenerateUuid } from '@shared/features/handleGenerateUuid/handleGenerateUuid';
import { getUserPermissions } from '@shared/permissions/getUserPermissions';
import { userPermissions } from '@shared/permissions/models/user';
import { sendMailNodemailer } from '@shared/providers/SendEmail';
import { TemplateInviteCollaborator } from '@shared/providers/templatesSendEmail/TemplateInviteCollaborator';
import { AppError } from '@shared/Util/AppError/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { CollaboratorSendInviteSchema } from './CollaboratorSendInvite.Schema';
import { ICollaboratorSendInviteDTO } from './DTO/ICollaboratorSendInviteDTO';

@injectable()
export class CollaboratorSendInviteUseCase {
  constructor(@inject('RepositoryUser') private RepositoryUser: IRepositoryUser) {}

  async execute(request: ICollaboratorSendInviteDTO.Params) {
    const { token, email } = ZODVerifyParse({
      schema: CollaboratorSendInviteSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUser.GetById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound, 401);

    const { cannot } = getUserPermissions({ role: dataUser.role, userId: dataUser.id });

    const user = userPermissions({ id: dataUser.id, role: 'COLLABORATOR' });
    if (cannot('invite', user)) throw new AppError(ErrorDictionary.COLLABORATOR.noPermissionToCreate);

    const { isExists: isExistsWithEmail } = await this.RepositoryUser.FindByEmail({ email });

    const { data: dataInvite } = await this.RepositoryUser.GetCollaboratorInviteByEmail({ email });
    if (dataInvite) await this.RepositoryUser.DeleteCollaboratorInvite({ id: dataInvite.id });

    const id = handleGenerateUuid();
    await this.RepositoryUser.CreateCollaboratorInvite({
      id,
      email,
    });

    sendMailNodemailer({
      content: TemplateInviteCollaborator({
        inviteId: id,
        hasAccount: isExistsWithEmail,
      }),
      toEmail: email,
      subject: 'Convite para participar de ICloaker',
    });

    const returnResponse = {
      ...ErrorDictionary.COLLABORATOR.created,
    };

    return returnResponse;
  }
}
