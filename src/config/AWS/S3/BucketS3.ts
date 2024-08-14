import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';

import { logger } from '@shared/Util/configLogger';
import { env } from '@shared/Util/Env/Env';

export const ConfigS3 = new S3Client({
  region: env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

const listBuckets = async () => {
  try {
    const response = await ConfigS3.send(new ListBucketsCommand({}));
    const buckets = response.Buckets?.map((bucket) => bucket.Name);
    logger.info(`Success connected S3: Buckets:${buckets?.length}`);
  } catch (err) {
    logger.fatal('Não foi possível listar os buckets do S3. Verifique suas credenciais e a rede.', err);
  }
};

listBuckets();
