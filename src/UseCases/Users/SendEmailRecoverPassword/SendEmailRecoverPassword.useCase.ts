import { IRepositoryRecoverPassword } from 'Repositories/RecoverPassword/IRepositoryRecoverPassword';
import { IRepositoryUsers } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { GetFutureTimestamp } from '@shared/features/GetFutureTimestamp/GetFutureTimestamp';
import { handleGenerateUuid } from '@shared/features/handleGenerateUuid/handleGenerateUuid';
import { sendMailNodemailer } from '@shared/providers/SendEmail';
import { TemplateForgotPassword } from '@shared/providers/templatesSendEmail/TemplateForgotPassword';
import { AppError } from '@shared/Util/AppError/AppError';
import { env } from '@shared/Util/Env/Env';

import { ISendEmailRecoverPasswordDTO } from './DTO/ISendEmailRecoverPasswordDTO';

@injectable()
export class SendEmailRecoverPasswordUseCase {
  constructor(
    @inject('RepositoryUsers') private RepositoryUsers: IRepositoryUsers,
    @inject('RepositoryRecoverPassword') private RepositoryRecoverPassword: IRepositoryRecoverPassword,
  ) {}

  async execute({ email }: ISendEmailRecoverPasswordDTO.Params) {
    const { data: userData, isExists } = await this.RepositoryUsers.FindUserByEmail({ email });
    if (!isExists || !userData?.id) throw new AppError('Não existe usuário com este email !');

    const { data: dataRecoverPassword } = await this.RepositoryRecoverPassword.FindByUserId({ userId: userData.id });

    if (dataRecoverPassword) await this.RepositoryRecoverPassword.DeleteById({ id: dataRecoverPassword.id });

    const idRecoverPassword = handleGenerateUuid();

    const expiration = GetFutureTimestamp({ amount: env.RECOVERY_PASSWORD_EXPIRATION_LIMIT_IN_MINUTES, unit: 'minutes' });

    await this.RepositoryRecoverPassword.Create({
      id: idRecoverPassword,
      userId: userData.id,
      expirationAt: new Date(expiration),
    });

    sendMailNodemailer({
      content: TemplateForgotPassword({ id: idRecoverPassword, name: userData.name }),
      toEmail: userData.email,
      subject: 'Member Area - Redefinição de senha',
    });

    const responseReturn = {
      message: 'Foi enviado um email para você recuperar sua senha !',
    };

    return responseReturn;
  }
}
