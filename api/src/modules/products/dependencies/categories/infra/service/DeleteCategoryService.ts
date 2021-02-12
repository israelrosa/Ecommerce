import IAdminRepository from '@modules/admin/interfaces/IAdminRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICategoriesRepository from '../../interfaces/ICategoriesRepository';

@injectable()
export default class DeleteCategoryService {
  private categoriesRepository: ICategoriesRepository;

  private adminRepository: IAdminRepository;

  constructor(
    @inject('CategoriesRepository')
    categoriesRepository: ICategoriesRepository,
    @inject('AdminRepository')
    adminRepository: IAdminRepository,
  ) {
    this.categoriesRepository = categoriesRepository;
    this.adminRepository = adminRepository;
  }

  async execute(categoryId: string, adminId: string): Promise<void> {
    const admin = await this.adminRepository.findById(adminId);

    if (!admin) {
      throw new AppError('O ADM não existe.');
    }

    if (!admin.type.createAdmins) {
      throw new AppError('O ADM não tem permissão.');
    }

    const category = await this.categoriesRepository.findById(categoryId);

    if (!category) {
      throw new AppError('A categoria não existe.');
    }

    await this.categoriesRepository.delete(categoryId);
  }
}
