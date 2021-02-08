import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@shared/providers/HashProvider/models/IHashProvider';

interface IRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  contactNumber?: string;
}

@injectable()
class CreateUserService {
  private usersRepository: IUsersRepository;

  private hashProvider: IHashProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,

    @inject('HashProvider')
    hashProvider: IHashProvider,
  ) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  async execute({
    email,
    firstname,
    lastname,
    password,
    contactNumber,
  }: IRequest): Promise<User> {
    if (await this.usersRepository.findByEmail(email)) {
      throw new AppError('O email já está em uso.');
    }

    if (contactNumber) {
      if (await this.usersRepository.findByContactNumber(contactNumber)) {
        throw new AppError('O número já está em uso.');
      }
    }

    const hash_password = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      firstname,
      lastname,
      email,
      password: hash_password,
      contactNumber,
    });

    return user;
  }
}

export default CreateUserService;
