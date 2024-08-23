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

  NODE_ENV: z
    .enum(['DEV', 'PRODUCTION', 'test', 'LOCAL'], {
      errorMap: (data) => ({ message: `NODE_ENV must be one of the following values: DEV, PRODUCTION, test, LOCAL. Received: ${data}` }),
    })
    .default('PRODUCTION'),

  LINK_LOGIN: z.string({ required_error: 'Please provide LINK_LOGIN environment variable' }),

  RECOVERY_PASSWORD_EXPIRATION_LIMIT_IN_MINUTES: z.string({
    required_error: 'Please provide RECOVERY_PASSWORD_EXPIRATION_LIMIT_IN_MINUTES environment variable',
  }),

  LINK_RECOVER_PASSWORD: z.string({ required_error: 'Please provide LINK_RECOVER_PASSWORD environment variable' }),

  DATABASE_URL: z.string({ required_error: 'Please provide DATABASE_URL environment variable' }),

  SECRET_TOKEN: z.string({ required_error: 'Please provide SECRET_TOKEN environment variable' }),

  AWS_SECRET_ACCESS_KEY: z.string({ required_error: 'Please provide AWS_SECRET_ACCESS_KEY environment variable' }),

  AWS_DEFAULT_REGION: z.string({ required_error: 'Please provide AWS_DEFAULT_REGION environment variable' }),

  AWS_ACCESS_KEY_ID: z.string({ required_error: 'Please provide AWS_ACCESS_KEY_ID environment variable' }),

  AWS_NAME_BUCKET: z.string({ required_error: 'Please provide AWS_NAME_BUCKET environment variable' }),

  LOCAL_UPLOAD_FILES: z.enum(['S3', 'local'], {
    errorMap: (data) => ({ message: `LOCAL_UPLOAD_FILES must be one of the following values: S3, local. Received: ${data}` }),
  }),

  GOOGLE_CLIENT_ID: z.string({ required_error: 'Please provide GOOGLE_CLIENT_ID environment variable' }),

  GOOGLE_CLIENT_SECRET: z.string({ required_error: 'Please provide GOOGLE_CLIENT_SECRET environment variable' }),

  GOOGLE_LOGIN_CALLBACK: z.string({ required_error: 'Please provide GOOGLE_LOGIN_CALLBACK environment variable' }),

  GOOGLE_LOGIN_REDIRECT: z.string({ required_error: 'Please provide GOOGLE_LOGIN_REDIRECT environment variable' }),

  GOOGLE_SYNC_REDIRECT: z.string({ required_error: 'Please provide GOOGLE_SYNC_REDIRECT environment variable' }),

  GOOGLE_SYNC_CALLBACK: z.string({ required_error: 'Please provide GOOGLE_SYNC_CALLBACK environment variable' }),

  QUEUE_SERVICE_FILES_DELETE: z.string({ required_error: 'Please provide QUEUE_SERVICE_FILES_DELETE environment variable' }),

  QUEUE_SEND_MAIL_SERVICE: z.string({ required_error: 'Please provide QUEUE_SEND_MAIL_SERVICE environment variable' }),

  AWS_PRODUCER_QUEUES_SECRET_ACCESS_KEY: z.string({ required_error: 'Please provide AWS_PRODUCER_QUEUES_SECRET_ACCESS_KEY environment variable' }),

  AWS_PRODUCER_QUEUES_DEFAULT_REGION: z.string({ required_error: 'Please provide AWS_PRODUCER_QUEUES_DEFAULT_REGION environment variable' }),

  AWS_PRODUCER_QUEUES_ACCESS_KEY_ID: z.string({ required_error: 'Please provide AWS_PRODUCER_QUEUES_ACCESS_KEY_ID environment variable' }),

  FRONT_END_BASE_URL: z.string({ required_error: 'Please provide FRONT_END_BASE_URL environment variable' }),

  AWS_SES_ACCESS_KEY_ID: z.string({ required_error: 'Please provide AWS_SES_ACCESS_KEY_ID environment variable' }),

  AWS_SES_SECRET_ACCESS_KEY: z.string({ required_error: 'Please provide AWS_SES_SECRET_ACCESS_KEY environment variable' }),

  AWS_SES_REGION: z.string({ required_error: 'Please provide AWS_SES_REGION environment variable' }),
});

const envZod = envSchema.safeParse(process.env);

if (envZod.success === false) {
  logger.fatal(envZod.error.format());
  throw new Error('🛑 Invalid environment variables !');
}

export const env = {
  AWS: {
    S3: {
      SECRET_ACCESS_KEY: envZod.data.AWS_SECRET_ACCESS_KEY,
      DEFAULT_REGION: envZod.data.AWS_DEFAULT_REGION,
      ACCESS_KEY_ID: envZod.data.AWS_ACCESS_KEY_ID,
      NAME_BUCKET: envZod.data.AWS_NAME_BUCKET,
      LOCAL_UPLOAD_FILES: envZod.data.LOCAL_UPLOAD_FILES,
    },
    QUEUE: {
      SERVICES: {
        FILES_DELETE: envZod.data.QUEUE_SERVICE_FILES_DELETE,
        SEND_MAIL: envZod.data.QUEUE_SEND_MAIL_SERVICE,
      },
      PRODUCER: {
        ACCESS_KEY_ID: envZod.data.AWS_PRODUCER_QUEUES_ACCESS_KEY_ID,
        SECRET_ACCESS_KEY: envZod.data.AWS_PRODUCER_QUEUES_SECRET_ACCESS_KEY,
        DEFAULT_REGION: envZod.data.AWS_PRODUCER_QUEUES_DEFAULT_REGION,
      },
    },
    SES: {
      ACCESS_KEY_ID: envZod.data.AWS_SES_ACCESS_KEY_ID,
      SECRET_ACCESS_KEY: envZod.data.AWS_SES_SECRET_ACCESS_KEY,
      DEFAULT_REGION: envZod.data.AWS_SES_REGION,
    },
  },
  JWT: {
    SECRET: envZod.data.SECRET_TOKEN,
  },
  DATABASE: {
    URL: envZod.data.DATABASE_URL,
  },
  REDIRECT_LINKS: {
    LOGIN: envZod.data.LINK_LOGIN,
    RECOVER_PASSWORD: envZod.data.LINK_RECOVER_PASSWORD,
  },
  ENVIRONMENT: {
    PORT: envZod.data.PORT,
    NODE_ENV: envZod.data.NODE_ENV,
  },
  RECOVER_PASSWORD_SETTINGS: {
    EXPIRATION_TIME_MINUTES: envZod.data.RECOVERY_PASSWORD_EXPIRATION_LIMIT_IN_MINUTES,
  },
  OAUTH: {
    GOOGLE: {
      CLIENT_ID: envZod.data.GOOGLE_CLIENT_ID,
      CLIENT_SECRET: envZod.data.GOOGLE_CLIENT_SECRET,
      LINKS: {
        LOGIN: {
          REDIRECT: envZod.data.GOOGLE_LOGIN_REDIRECT,
          CALLBACK: envZod.data.GOOGLE_LOGIN_CALLBACK,
        },
        SYNC: {
          REDIRECT: envZod.data.GOOGLE_SYNC_REDIRECT,
          CALLBACK: envZod.data.GOOGLE_SYNC_CALLBACK,
        },
      },
    },
  },
  URLS: {
    FRONT_END_BASE_URL: envZod.data.FRONT_END_BASE_URL,
  },
};
