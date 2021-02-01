import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';

interface IRequest {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  oldPassword?: string;
  contactNumber?: string;
}

@injectable()
class UpdateProfileService {
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

  public async execute({
    id,
    firstname,
    lastname,
    email,
    password,
    oldPassword,
    contactNumber,
  }: IRequest): Promise<User | undefined> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== id) {
      throw new AppError('Esse email já está sendo utilizado.');
    }

    if (password && oldPassword) {
      const validOldPassword = await this.hashProvider.compareHash(
        oldPassword,
        user.password,
      );

      if (!validOldPassword) {
        throw new AppError('A senha antiga está errada.');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    if (contactNumber) {
      const userWithUpdatedContact = await this.usersRepository.findByContactNumber(
        contactNumber,
      );

      if (userWithUpdatedContact && userWithUpdatedContact.id !== id) {
        throw new AppError('Esse número de telefone já está sendo utilizado.');
      }
    }

    Object.assign(user, {
      firstname,
      lastname,
      email,
      contactNumber,
    });

    await this.usersRepository.update(user);
    return user;
  }
}

export default UpdateProfileService;
