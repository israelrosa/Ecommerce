import { injectable, inject } from 'tsyringe';
import authConfig from '@config/authConfig';
import AppError from '@shared/errors/AppError';
import { sign } from 'jsonwebtoken';
import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import IHashProvider from '@shared/providers/HashProvider/models/IHashProvider';
import User from '../typeorm/entities/User';

interface IRequest {
  email?: string;
  contactNumber?: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  private userRepository: IUsersRepository;

  private hashProvider: IHashProvider;

  constructor(
    @inject('UsersRepository')
    userRepository: IUsersRepository,
    @inject('HashProvider')
    HashProvider: IHashProvider,
  ) {
    this.userRepository = userRepository;
    this.hashProvider = HashProvider;
  }

  private async createSessionToken(
    user: User,
    password: string,
  ): Promise<IResponse> {
    if (!(await this.hashProvider.compareHash(password, user.password))) {
      throw new AppError('Combinação Incorreta.');
    }

    const token = sign({ admin: false }, authConfig.secret, {
      subject: user.id,
      expiresIn: authConfig.expiresIn,
    });

    return { user, token };
  }

  public async execute({
    email,
    contactNumber,
    password,
  }: IRequest): Promise<IResponse> {
    if (email) {
      const user = await this.userRepository.findByEmail(email);

      if (user) {
        return this.createSessionToken(user, password);
      }
      throw new AppError('Combinação incorreta.');
    }

    if (contactNumber) {
      const user = await this.userRepository.findByContactNumber(contactNumber);

      if (user) {
        return this.createSessionToken(user, password);
      }
      throw new AppError('Combinação incorreta.');
    }

    throw new AppError('Combinação incorreta.');
  }
}

export default AuthenticateUserService;
