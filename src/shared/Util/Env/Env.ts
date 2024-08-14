import { config } from 'dotenv';
import { z } from 'zod';

import { logger } from '../configLogger';

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env' });
} else {
  config();
}

const envSchema = z.object({
  PORT: z.string().default('3001'),
  NODE_ENV: z.enum(['DEV', 'PRODUCTION', 'test', 'LOCAL']).default('PRODUCTION'),

  EMAIL_HOST: z.string(),
  EMAIL_PORT: z.string(),
  EMAIL_USER: z.string(),
  EMAIL_PASS: z.string(),

  LINK_LOGIN: z.string(),

  RECOVERY_PASSWORD_EXPIRATION_LIMIT_IN_MINUTES: z.string(),

  LINK_RECOVER_PASSWORD: z.string(),

  DATABASE_URL: z.string({ required_error: 'Colocar env DATABASE_URL' }),

  SECRET_TOKEN: z.string(),

  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_DEFAULT_REGION: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_NAME_BUCKET: z.string(),
  LOCAL_UPLOAD_FILES: z.enum(['S3', 'local']),
});

const envZod = envSchema.safeParse(process.env);

if (envZod.success === false) {
  logger.fatal(envZod.error.format());
  throw new Error('🛑 Invalid environment variables !');
}

export const env = {
  ...envZod.data,
};
