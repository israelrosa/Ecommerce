import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';
import { inject } from 'tsyringe';
import User from '../typeorm/entities/User';

export default class UpdateUserAvatarService {
  private usersRepository: IUsersRepository;

  private storageProvider: IStorageProvider;

  constructor(
    @inject('UsersRepository') usersRepository: IUsersRepository,
    @inject('StorageProvider') storageProvider: IStorageProvider,
  ) {
    this.usersRepository = usersRepository;
    this.storageProvider = storageProvider;
  }

  async execute(file: string, userId: string): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('O usuário não existe.');
    }

    await this.storageProvider.createFile(file);

    user.avatar = file;

    await this.usersRepository.update(user);

    return user;
  }
}
