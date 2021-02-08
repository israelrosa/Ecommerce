import IAdminTypesRepository from '@modules/admin/dependencies/adminTypes/interfaces/IAdminTypesRepository';
import IAdminRepository from '@modules/admin/interfaces/IAdminRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IParams {
  adminId: string;
  id: string;
}

@injectable()
export default class DeleteAdminService {
  private adminRepository: IAdminRepository;

  private adminTypesRepository: IAdminTypesRepository;

  constructor(
    @inject('AdminRepository') adminRepository: IAdminRepository,
    @inject('AdminTypesRepository') adminTypesRepository: IAdminTypesRepository,
  ) {
    this.adminRepository = adminRepository;
    this.adminTypesRepository = adminTypesRepository;
  }

  async execute({ adminId, id }: IParams): Promise<void> {
    const admin = await this.adminRepository.findById(adminId);

    if (!admin) {
      throw new AppError(
        'Não é possível deletar uma conta ADM se você não for um administrador.',
      );
    }

    if (!admin.type.adminPermissions) {
      throw new AppError('O ADM não tem permissão.');
    }

    await this.adminRepository.delete(id);
  }
}
