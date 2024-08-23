import AWS from 'aws-sdk';

import { env } from '@shared/Util/Env/Env';

AWS.config.update({
  accessKeyId: env.AWS.SES.ACCESS_KEY_ID,
  secretAccessKey: env.AWS.SES.SECRET_ACCESS_KEY,
  region: env.AWS.SES.DEFAULT_REGION,
});

export const AWS_SES = new AWS.SES({ apiVersion: '2012-10-17' });
