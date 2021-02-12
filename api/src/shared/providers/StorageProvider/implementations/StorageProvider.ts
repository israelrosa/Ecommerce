import uploadConfig from '@config/uploadConfig';
import AppError from '@shared/errors/AppError';
import fs from 'fs';
import path from 'path';
import IStorageProvider from '../models/IStorageProvider';

export default class StorageProvider implements IStorageProvider {
  async createFile(file: string): Promise<void> {
    await fs.promises
      .rename(
        path.resolve(uploadConfig.tmpFolder, file),
        path.resolve(uploadConfig.uploadFolder, file),
      )
      .catch(() => {
        throw new AppError(`Não foi possível renomear o arquivo ${file}`);
      });
  }

  async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadFolder, file);

    await fs.promises.stat(filePath).catch(() => {
      throw new AppError('O arquivo não foi encontrado.');
    });

    await fs.promises.unlink(filePath);
  }
}
