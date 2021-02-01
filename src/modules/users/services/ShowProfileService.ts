import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../interfaces/IUsersRepository';
import User from '../typeorm/entities/User';

@injectable()
class ShowProfileService {
  private usersRepository: IUsersRepository;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
  ) {
    this.usersRepository = usersRepository;
  }

  public async execute(userId: string): Promise<User | undefined> {
    const user = await this.usersRepository.findById(userId);

    if (user) {
      return user;
    }
    throw new AppError('Usuário não existe.');
  }
}

export default ShowProfileService;
