import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import MulterS3 from 'multer-s3';

import { env } from '@shared/Util/Env/Env';

import { handleCreateHashImg } from '../../../shared/features/handleCreateHashImg';
import { ConfigS3 } from '../../AWS/S3/BucketS3';
import { IS3Service } from './IS3Config';

const {
  AWS: {
    S3: { NAME_BUCKET },
  },
} = env;

export const MulterS3Config = MulterS3({
  s3: ConfigS3,
  bucket: NAME_BUCKET,
  contentType: MulterS3.AUTO_CONTENT_TYPE,
  acl: 'public-read',

  key: (req, file, cb) => {
    const resultKey = handleCreateHashImg(file.originalname);
    cb(null, resultKey);
  },
});

export class S3Service implements IS3Service {
  async DeleteImage({ key }: { key: string }) {
    const params = {
      Bucket: NAME_BUCKET,
      Key: key,
    };

    const DeleteObject = new DeleteObjectCommand(params);

    ConfigS3.send(DeleteObject).then();
  }
}
