import nodemailer from 'nodemailer';

import 'dotenv/config';
import { logger } from '@shared/Util/configLogger';
import { env } from '@shared/Util/Env/Env';

export const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: Number(env.EMAIL_HOST),
  secure: false,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
  tls: { rejectUnauthorized: false },
});

transporter.verify((error, success) => {
  if (error) {
    return logger.fatal(`Error connection Gmail ${error}`);
  }

  logger.info('Success connected Gmail');
  return success;
});
