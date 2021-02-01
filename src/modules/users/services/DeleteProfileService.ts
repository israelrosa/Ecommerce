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

  public async execute(userId: string): Promise<number> {
    const row = await this.usersRepository.delete(userId);
    return row;
  }
}

export default DeleteProfileService;
