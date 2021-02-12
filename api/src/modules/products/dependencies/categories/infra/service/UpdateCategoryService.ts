import IAdminRepository from '@modules/admin/interfaces/IAdminRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICategoriesRepository from '../../interfaces/ICategoriesRepository';
import Category from '../typeorm/entities/Category';

interface IParams {
  adminId: string;
  id: string;
  name: string;
  categoryId?: string;
}

@injectable()
export default class UpdateCategoryService {
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

  async execute({ adminId, categoryId, id, name }: IParams): Promise<Category> {
    const admin = await this.adminRepository.findById(adminId);

    if (!admin) {
      throw new AppError('O ADM não existe.');
    }

    if (!admin.type.createAdmins) {
      throw new AppError('O ADM não tem permissão.');
    }

    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new AppError('A categoria não existe.');
    }

    if (categoryId) {
      const newCategoryFather = await this.categoriesRepository.findById(
        categoryId,
      );

      if (!newCategoryFather) {
        throw new AppError('A categoria não existe.');
      }
    }

    const newCategoryExist = await this.categoriesRepository.findByName(name);

    if (!newCategoryExist) {
      throw new AppError('A categoria já existe.');
    }

    Object.assign(category, {
      name,
      categoryId,
    });

    const data = await this.categoriesRepository.update(category);

    return data;
  }
}
