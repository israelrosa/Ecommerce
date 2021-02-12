import { container } from 'tsyringe';
import BCryptHashProvider from './HashProvider/implementations/BCyrptHashProvider';
import IHashProvider from './HashProvider/models/IHashProvider';
import StorageProvider from './StorageProvider/implementations/StorageProvider';
import IStorageProvider from './StorageProvider/models/IStorageProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  StorageProvider,
);
