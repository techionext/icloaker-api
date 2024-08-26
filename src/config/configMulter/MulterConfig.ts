import { Request } from 'express';

import 'dotenv/config';

import { AppError } from '@shared/Util/Errors/AppError';

import { MulterS3Config } from './Local';

interface IHandleGetMulterConfig {
  fileSize: number;
  allowedMimes: string[];
}

export const handleGetMulterConfig = ({ fileSize, allowedMimes }: IHandleGetMulterConfig) => {
  const multerConfig = {
    storage: MulterS3Config,

    limits: { fileSize }, // 5.2MB

    fileFilter: (req: Request, file: any, cb: any) => {
      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new AppError({ codeIntern: 'NONE', message: 'Tipo de arquivo invalido!' }));
      }
    },
  };
  return multerConfig;
};
