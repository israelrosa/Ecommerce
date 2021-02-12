import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';

interface UploadConfig {
  tmpFolder: string;
  uploadFolder: string;
  multer: {
    storage: StorageEngine;
  };
}

const tmpFolder = path.resolve(__dirname, '..', '..', 'temp');
const uploadFolder = path.resolve(tmpFolder, 'upload');

const uploadConfig = {
  tmpFolder,
  uploadFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename: (req, file, cb) => {
        const fileHash = crypto.randomBytes(16).toString('hex');
        const filename = `${fileHash}-${file.originalname}`;
        return cb(null, filename);
      },
    }),
  },
} as UploadConfig;

export default uploadConfig;
