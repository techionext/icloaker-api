import { transporter } from '@config/configNodeMailer';

import { logger } from '@shared/Util/configLogger';

import { TemplateCardCore } from './templatesSendEmail/TemplateCardCore';

interface ISendResetPassword {
  toEmail: string;
  subject: string;
  content: string;
}

export const sendMailNodemailer = async ({ toEmail, content, subject }: ISendResetPassword) => {
  transporter
    .sendMail({
      from: 'Comunicação member area <richardsendemail@gmail.com',
      to: [`${toEmail}`],
      text: 'Texto do E-mail',
      subject, // Assunto
      html: TemplateCardCore({ content }), // conteúdo
    })
    .then(() => {
      const success = 'Email enviado com sucesso !';
      return success;
    })
    .catch((error) => {
      logger.fatal(error);
      const fatal = 'Internal Server error';
      return fatal;
    });
};
