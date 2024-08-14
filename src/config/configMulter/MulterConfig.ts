import { Request } from 'express';

import 'dotenv/config';

import { AppError } from '@shared/Util/AppError/AppError';
import { env } from '@shared/Util/Env/Env';

import { MulterLocalConfig, MulterS3Config, pathsLocalFiles } from './Local';

const handleGetLocalStorage = () => {
  const storageTypes = {
    local: MulterLocalConfig,
    s3: MulterS3Config,
  };

  const localUpload = env.LOCAL_UPLOAD_FILES;

  switch (localUpload) {
    case 'S3': {
      return storageTypes.s3;
    }
    case 'local': {
      return storageTypes.local;
    }

    default: {
      throw new AppError('Nenhum método encontrado para fazer upload, entrar em contato com o suporte');
    }
  }
};

interface IHandleGetMulterConfig {
  fileSize: number;
  allowedMimes: string[];
}

export const handleGetMulterConfig = ({ fileSize, allowedMimes }: IHandleGetMulterConfig) => {
  const multerConfig = {
    dest: pathsLocalFiles,

    storage: handleGetLocalStorage(),

    limits: { fileSize }, // 5.2MB

    fileFilter: (req: Request, file: any, cb: any) => {
      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new AppError('Tipo de arquivo invalido!'));
      }
    },
  };
  return multerConfig;
};
