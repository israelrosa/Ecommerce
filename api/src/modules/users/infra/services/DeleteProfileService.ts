import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/interfaces/IUsersRepository';

@injectable()
class DeleteProfileService {
  private usersRepository: IUsersRepository;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
  ) {
    this.usersRepository = usersRepository;
  }

  public async execute(userId: string): Promise<void> {
    await this.usersRepository.delete(userId);
  }
}

export default DeleteProfileService;
