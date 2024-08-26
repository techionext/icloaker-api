import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { verifyNowIsAfter } from '@shared/features/verifyNowIsAfter/verifyNowIsAfter';
import { AppError } from '@shared/Util/Errors/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { CollaboratorAcceptInviteSchema } from './CollaboratorAcceptInvite.Schema';
import { ICollaboratorAcceptInviteDTO } from './DTO/ICollaboratorAcceptInviteDTO';

@injectable()
export class CollaboratorAcceptInviteUseCase {
  constructor(@inject('RepositoryUser') private RepositoryUser: IRepositoryUser) {}

  async execute(request: ICollaboratorAcceptInviteDTO.Params) {
    const { token, inviteId } = ZODVerifyParse({
      schema: CollaboratorAcceptInviteSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUser.GetById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound, 401);

    if (!dataUser.email) throw new AppError(ErrorDictionary.USER.noEmailRegistration);

    const { data: dataInvite } = await this.RepositoryUser.GetCollaboratorInviteById({ id: inviteId });
    if (!dataInvite) throw new AppError(ErrorDictionary.USER.inviteNotFoundOrExpired);

    if (dataUser.email !== dataInvite.email) throw new AppError(ErrorDictionary.USER.inviteNotFoundOrExpired);

    if (verifyNowIsAfter({ date: dataInvite.createdAt, hours: 24 })) {
      await this.RepositoryUser.DeleteCollaboratorInvite({ id: dataInvite.id });
      throw new AppError(ErrorDictionary.USER.inviteNotFoundOrExpired);
    }

    await this.RepositoryUser.ChangeRole({ id: dataUser.id, role: 'COLLABORATOR' });
    await this.RepositoryUser.DeleteCollaboratorInvite({ id: dataInvite.id });

    const returnResponse = {
      ...ErrorDictionary.USER.roleChangedToCollaborator,
    };

    return returnResponse;
  }
}
