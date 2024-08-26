import { IRepositoryRecoverPassword } from 'Repositories/RecoverPassword/IRepositoryRecoverPassword';
import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { GetFutureTimestamp } from '@shared/features/GetFutureTimestamp/GetFutureTimestamp';
import { handleGenerateUuid } from '@shared/features/handleGenerateUuid/handleGenerateUuid';
import { sendMailNodemailer } from '@shared/providers/SendEmail';
import { TemplateForgotPassword } from '@shared/providers/templatesSendEmail/TemplateForgotPassword';
import { AppError } from '@shared/Util/Errors/AppError';
import { env } from '@shared/Util/Env/Env';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { IUserRequestPasswordChangeDTO } from './DTO/IUserRequestPasswordChangeDTO';
import { UserRequestPasswordChangeSchema } from './UserRequestPasswordChange.Schema';

@injectable()
export class UserRequestPasswordChangeUseCase {
  constructor(
    @inject('RepositoryUser') private RepositoryUser: IRepositoryUser,
    @inject('RepositoryRecoverPassword') private RepositoryRecoverPassword: IRepositoryRecoverPassword,
  ) {}

  async execute(request: IUserRequestPasswordChangeDTO.Params) {
    const { email } = ZODVerifyParse({
      schema: UserRequestPasswordChangeSchema,
      data: request,
    });

    const { data: userData, isExists } = await this.RepositoryUser.GetByEmail({ email });
    if (!isExists || !userData?.id) throw new AppError(ErrorDictionary.USER.emailNotFound);
    const { data: dataRecoverPassword } = await this.RepositoryRecoverPassword.GetByUserId({ userId: userData.id });

    if (dataRecoverPassword) await this.RepositoryRecoverPassword.DeleteById({ id: dataRecoverPassword.id });

    const idRecoverPassword = handleGenerateUuid();

    const expiration = GetFutureTimestamp({ amount: env.RECOVER_PASSWORD_SETTINGS.EXPIRATION_TIME_MINUTES, unit: 'minutes' });

    await this.RepositoryRecoverPassword.Create({
      id: idRecoverPassword,
      userId: userData.id,
      expirationAt: new Date(expiration),
    });

    sendMailNodemailer({
      content: TemplateForgotPassword({ id: idRecoverPassword, name: userData.name }),
      toEmail: userData.email,
      subject: 'Template - Solicitação de redefinição da senha',
    });

    const responseReturn = {
      ...ErrorDictionary.RECOVER_PASSWORD.emailSent,
    };

    return responseReturn;
  }
}
