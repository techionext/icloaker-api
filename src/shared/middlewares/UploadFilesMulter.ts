import { Request, Response, NextFunction } from 'express';

import { handleGetMulterConfig } from '@config/configMulter/MulterConfig';
import multer, { MulterError } from 'multer';

import { getFileSize } from '../features/getFileSize';

interface IUploadFiles {
  nameField: string;
  sizeLimite: number;
  type_image: 'multiple' | 'single';
  allowedMimes: string[];
}

export const UploadFilesMulter = ({ nameField, sizeLimite, type_image, allowedMimes }: IUploadFiles) => {
  const UploadFiles = async (req: Request, res: Response, next: NextFunction) => {
    const upload =
      type_image === 'multiple'
        ? multer(handleGetMulterConfig({ fileSize: sizeLimite, allowedMimes })).array(nameField)
        : multer(handleGetMulterConfig({ fileSize: sizeLimite, allowedMimes })).single(nameField);

    upload(req, res, (err) => {
      if (err instanceof MulterError) {
        if (err.message === 'File too large') {
          return res.status(400).json({ message: `Algum arquivo é maior que ${getFileSize(sizeLimite)} !` });
        }
        if (err.message === 'Unexpected field') {
          return res.status(400).json({ message: `Para fazer upload o campo esperado é '${nameField}' !` });
        }
      }
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      return next();
    });
  };

  return UploadFiles;
};
