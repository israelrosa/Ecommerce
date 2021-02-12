import { inject, injectable } from 'tsyringe';
import ICategoriesRepository from '../../interfaces/ICategoriesRepository';
import Category from '../typeorm/entities/Category';

@injectable()
export default class ShowAllCategoryService {
  private categoriesRepository: ICategoriesRepository;

  constructor(
    @inject('CategoriesRepository')
    categoriesRepository: ICategoriesRepository,
  ) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute(): Promise<Category[]> {
    const data = await this.categoriesRepository.showAll();

    return data;
  }
}
