import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import MulterS3 from 'multer-s3';

import { env } from '@shared/Util/Env/Env';

import { handleCreateHashImg } from '../../../shared/features/handleCreateHashImg';
import { ConfigS3 } from '../../AWS/S3/BucketS3';

const { AWS_NAME_BUCKET } = env;

export const MulterS3Config = MulterS3({
  s3: ConfigS3,
  bucket: AWS_NAME_BUCKET,
  contentType: MulterS3.AUTO_CONTENT_TYPE,
  acl: 'public-read',

  key: (req, file, cb) => {
    const resultKey = handleCreateHashImg(file.originalname);
    cb(null, resultKey);
  },
});

interface IAwsS3DeleteObject {
  key: string;
}

export class DeleteImagesService {
  async execute({ key }: IAwsS3DeleteObject) {
    const params = {
      Bucket: AWS_NAME_BUCKET,
      Key: key,
    };

    const DeleteObject = new DeleteObjectCommand(params);

    ConfigS3.send(DeleteObject).then();
  }
}
