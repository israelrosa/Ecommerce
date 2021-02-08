import IAdminTypesRepository from '@modules/admin/dependencies/adminTypes/interfaces/IAdminTypesRepository';
import ICreateAdminDTO from '@modules/admin/interfaces/dtos/ICreateAdminDTO';
import IAdminRepository from '@modules/admin/interfaces/IAdminRepository';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@shared/providers/HashProvider/models/IHashProvider';
import { inject, injectable } from 'tsyringe';
import Admin from '../typeorm/entity/Admin';

interface IParams extends ICreateAdminDTO {
  adminId: string;
}

@injectable()
export default class CreateAdminService {
  private adminRepository: IAdminRepository;

  private adminTypesRepository: IAdminTypesRepository;

  private hashProvider: IHashProvider;

  constructor(
    @inject('AdminRepository') adminRepository: IAdminRepository,
    @inject('AdminTypesRepository') adminTypesRepository: IAdminTypesRepository,
    @inject('HashProvider') hashProvider: IHashProvider,
  ) {
    this.adminRepository = adminRepository;
    this.adminTypesRepository = adminTypesRepository;
    this.hashProvider = hashProvider;
  }

  async execute({
    adminId,
    email,
    password,
    username,
    typeId,
  }: IParams): Promise<Admin> {
    const admin = await this.adminRepository.findById(adminId);

    if (!admin) {
      throw new AppError(
        'Não é possível criar uma conta ADM se você não for um administrador.',
      );
    }

    if (!admin.type.createAdmins) {
      throw new AppError('O ADM não tem permissão.');
    }

    if (!(await this.adminTypesRepository.findById(typeId))) {
      throw new AppError('O tipo de administrador não existe.');
    }

    const passwordHashed = await this.hashProvider.generateHash(password);

    const data = await this.adminRepository.create({
      email,
      password: passwordHashed,
      typeId,
      username,
    });

    return data;
  }
}
