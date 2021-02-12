import IAdminRepository from '@modules/admin/interfaces/IAdminRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICategoriesRepository from '../../interfaces/ICategoriesRepository';
import Category from '../typeorm/entities/Category';

@injectable()
export default class CreateCategoryService {
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

  async execute(
    name: string,
    adminId: string,
    categoryId?: string,
  ): Promise<Category> {
    const admin = await this.adminRepository.findById(adminId);

    if (!admin) {
      throw new AppError('O ADM não existe.');
    }

    if (!admin.type.createAdmins) {
      throw new AppError('O ADM não tem permissão.');
    }

    if (categoryId) {
      const category = await this.categoriesRepository.findById(categoryId);

      if (!category) {
        throw new AppError('A categoria não existe.');
      }
    }

    const newCategoryExist = await this.categoriesRepository.findByName(name);

    if (!newCategoryExist) {
      throw new AppError('A categoria já existe.');
    }

    const data = await this.categoriesRepository.create(name, categoryId);

    return data;
  }
}
