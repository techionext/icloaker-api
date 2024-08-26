import { AWS_SES } from '@config/AWS/SES';
import nodemailer from 'nodemailer';

import { logger } from '@shared/Util/configLogger';
import { AppError } from '@shared/Util/Errors/AppError';

import { TemplateCardCore } from './templatesSendEmail/TemplateCardCore';

interface ISendEmail {
  toEmail: string;
  subject: string;
  content: string;
}

export const transporter = nodemailer.createTransport({ SES: AWS_SES });

transporter.verify((error, success) => {
  if (error) return logger.fatal(`Error connection Gmail ${error}`);

  logger.info('Success connected Sever Email');
  return success;
});

export const sendMailNodemailer = async ({ toEmail, content, subject }: ISendEmail) => {
  try {
    transporter.sendMail({
      from: 'ICloaker <agenusdevops@gmail.com>',
      to: toEmail,
      subject,
      html: TemplateCardCore({ content }),
    });

    return { message: 'Email enviado com sucesso' };
  } catch (error) {
    throw new AppError({ codeIntern: 'SYS003', message: `Falha no envio de email, ${error}` });
  }
};
