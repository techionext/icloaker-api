import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { handleGenerateUuid } from '@shared/features/handleGenerateUuid/handleGenerateUuid';
import { verifyNowIsAfter } from '@shared/features/verifyNowIsAfter/verifyNowIsAfter';
import { sendMailNodemailer } from '@shared/providers/SendEmail';
import { TemplateCreateNewUser } from '@shared/providers/templatesSendEmail/TemplateCreateNewUser';
import { AppError } from '@shared/Util/Errors/AppError';
import { handleCreateHash } from '@shared/Util/configHashPassword/handleCreatehash';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { IUserCreateDTO } from './DTO/IUserCreateDTO';
import { UserCreateSchema } from './UserCreate.Schema';

@injectable()
export class UserCreateUseCase {
  constructor(@inject('RepositoryUser') private RepositoryUser: IRepositoryUser) {}

  private async handleInvite({ inviteId, email, userId }: { inviteId: string; email: string; userId: string }) {
    const { data: dataInvite } = await this.RepositoryUser.GetCollaboratorInviteByEmail({ email });
    if (!dataInvite) throw new AppError(ErrorDictionary.USER.noInviteWithId);

    if (email !== dataInvite.email) {
      throw new AppError(ErrorDictionary.USER.inviteEmailMismatch);
    }

    if (verifyNowIsAfter({ date: dataInvite.createdAt, hours: 24 })) {
      await this.RepositoryUser.DeleteCollaboratorInvite({ id: inviteId });
      throw new AppError(ErrorDictionary.USER.inviteExpired);
    }

    await this.RepositoryUser.DeleteCollaboratorInvite({ id: inviteId });
    await this.RepositoryUser.ChangeRole({ id: userId, role: 'COLLABORATOR' });
  }

  async execute(request: IUserCreateDTO.Params) {
    const { email, name, password, phone, inviteId } = ZODVerifyParse({
      schema: UserCreateSchema,
      data: request,
    });

    const { isExists } = await this.RepositoryUser.FindByEmail({
      email,
    });
    if (isExists) throw new AppError(ErrorDictionary.USER.emailAlreadyExists);

    const id = handleGenerateUuid();
    const hashPassword = handleCreateHash(password);

    await this.RepositoryUser.Create({
      id,
      name,
      phone,
      email,
      password: hashPassword,
    });

    const emailId = handleGenerateUuid();
    await this.RepositoryUser.CreateMagicLink({ id: emailId, userId: id });

    sendMailNodemailer({
      content: TemplateCreateNewUser({ name, emailId }),
      toEmail: email,
      subject: 'Criação de conta ICloaker',
    });

    if (inviteId) {
      await this.handleInvite({ email, inviteId, userId: id });
    }

    const returnResponse = {
      ...ErrorDictionary.USER.userCreatedSuccessfully,
    };

    return returnResponse;
  }
}
