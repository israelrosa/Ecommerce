import Category from '../infra/typeorm/entities/Category';

export default interface ICategoriesRepository {
  create(name: string, categoryId?: string): Promise<Category>;
  delete(id: string): Promise<void>;
  update(category: Category): Promise<Category>;
  showAll(): Promise<Category[]>;
  findById(id: string): Promise<Category | undefined>;
  findByName(name: string): Promise<Category | undefined>;
}
