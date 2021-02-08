import IAdminTypesRepository from '@modules/admin/dependencies/adminTypes/interfaces/IAdminTypesRepository';
import ICreateAdminDTO from '@modules/admin/interfaces/dtos/ICreateAdminDTO';
import IAdminRepository from '@modules/admin/interfaces/IAdminRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Admin from '../typeorm/entity/Admin';

interface IParams extends ICreateAdminDTO {
  adminId: string;
  id: string;
}

@injectable()
export default class UpdateAdminService {
  private adminRepository: IAdminRepository;

  private adminTypesRepository: IAdminTypesRepository;

  constructor(
    @inject('AdminRepository') adminRepository: IAdminRepository,
    @inject('AdminTypesRepository') adminTypesRepository: IAdminTypesRepository,
  ) {
    this.adminRepository = adminRepository;
    this.adminTypesRepository = adminTypesRepository;
  }

  async execute({
    adminId,
    id,
    email,
    typeId,
    username,
    password,
  }: IParams): Promise<Admin> {
    const admin = await this.adminRepository.findById(adminId);

    if (!admin) {
      throw new AppError(
        'Não é possível atualizar uma conta ADM se você não for um administrador.',
      );
    }

    if (!admin.type.updateAdmins || admin.id !== id) {
      throw new AppError('O ADM não tem permissão.');
    }

    const adminToUpdate = await this.adminRepository.findById(id);

    if (!adminToUpdate) {
      throw new AppError('A conta ADM não existe.');
    }

    Object.assign(adminToUpdate, { email, typeId, username, password });

    const result = await this.adminRepository.update(adminToUpdate);

    return result;
  }
}
