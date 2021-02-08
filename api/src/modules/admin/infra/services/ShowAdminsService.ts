import IAdminRepository from '@modules/admin/interfaces/IAdminRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Admin from '../typeorm/entity/Admin';

@injectable()
export default class ShowAdminService {
  private adminRepository: IAdminRepository;

  constructor(@inject('AdminRepository') adminRepository: IAdminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(adminId: string): Promise<Admin[]> {
    const admin = await this.adminRepository.findById(adminId);

    if (!admin) {
      throw new AppError(
        'Não é possível visualizar contas ADM se você não for um administrador.',
      );
    }

    const admins = await this.adminRepository.showAll();

    return admins;
  }
}
