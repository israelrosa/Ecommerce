import authConfig from '@config/authConfig';
import IAdminRepository from '@modules/admin/interfaces/IAdminRepository';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@shared/providers/HashProvider/models/IHashProvider';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import Admin from '../typeorm/entity/Admin';

interface IResponse {
  admin: Admin;
  token: string;
}

interface IRequest {
  username?: string;
  email?: string;
  password: string;
}

@injectable()
export default class CreateAdminSessionService {
  private adminRepository: IAdminRepository;

  private hashProvider: IHashProvider;

  constructor(
    @inject('AdminRepository') adminRepository: IAdminRepository,
    @inject('HashProvider') hashProvider: IHashProvider,
  ) {
    this.adminRepository = adminRepository;
    this.hashProvider = hashProvider;
  }

  private async createSessionToken(
    admin: Admin,
    password: string,
  ): Promise<IResponse> {
    if (!(await this.hashProvider.compareHash(password, admin.password))) {
      throw new AppError('Combinação Incorreta.');
    }

    const token = sign({ admin: true }, authConfig.secret, {
      subject: admin.id,
      expiresIn: authConfig.expiresIn,
    });

    return { admin, token };
  }

  async execute({ email, password, username }: IRequest): Promise<IResponse> {
    if (email) {
      const admin = await this.adminRepository.findByEmail(email);

      if (!admin) {
        throw new AppError('Combinação Incorreta.');
      }

      if (!(await this.hashProvider.compareHash(password, admin.password))) {
        throw new AppError('Combinação Incorreta.');
      }

      const data = await this.createSessionToken(admin, password);

      return data;
    }
    if (username) {
      const admin = await this.adminRepository.findByUsername(username);

      if (!admin) {
        throw new AppError('Combinação Incorreta.');
      }

      if (!(await this.hashProvider.compareHash(password, admin.password))) {
        throw new AppError('Combinação Incorreta.');
      }

      const data = await this.createSessionToken(admin, password);

      return data;
    }
    throw new AppError('É necessário o email ou nome do ADM para logar.');
  }
}
