import multer from 'multer';
import path from 'path';

import { handleCreateHashImg } from '@shared/features/handleCreateHashImg';

export const pathsLocalFiles = path.resolve(__dirname, '..', '..', '..', '..', 'tmp', 'uploads');

export const MulterLocalConfig = multer.diskStorage({
  destination: (req, file, cb) => cb(null, pathsLocalFiles),

  filename: (req, file, cb) => {
    const resultKey = handleCreateHashImg(file.originalname);
    cb(null, resultKey);
  },
});
