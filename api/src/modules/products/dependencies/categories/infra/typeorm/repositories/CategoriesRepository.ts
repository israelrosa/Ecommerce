import AppError from '@shared/errors/AppError';
import { getRepository, Repository } from 'typeorm';
import ICategoriesRepository from '../../../interfaces/ICategoriesRepository';
import Category from '../entities/Category';

export default class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  async create(name: string, categoryId: string): Promise<Category> {
    const data = await this.ormRepository.create({ categoryId, name });

    const result = await this.ormRepository.save(data);

    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await this.ormRepository.delete(id);

    if (!result.affected) {
      throw new AppError('Não foi possível deletar a categoria', 500);
    }
  }

  async update(category: Category): Promise<Category> {
    const data = await this.ormRepository.save(category);

    return data;
  }

  async findById(id: string): Promise<Category | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }

  async findByName(name: string): Promise<Category | undefined> {
    const data = await this.ormRepository.findOne({ where: { name } });

    return data;
  }

  async showAll(): Promise<Category[]> {
    const data = await this.ormRepository.find();

    return data;
  }
}
