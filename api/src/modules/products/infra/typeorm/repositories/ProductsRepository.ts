import ICreateProductDTO from '@modules/products/interfaces/dtos/ICreateProductDTO';
import IProductsRepository from '@modules/products/interfaces/IProductsRepository';
import AppError from '@shared/errors/AppError';
import { getRepository, Repository } from 'typeorm';
import Product from '../entities/Products';

export default class ProductsRepository implements IProductsRepository {
  ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  async create({
    categoryId,
    description,
    price,
    title,
    discount,
  }: ICreateProductDTO): Promise<Product> {
    const data = await this.ormRepository.create({
      categoryId,
      description,
      discount,
      price,
      title,
    });

    const result = await this.ormRepository.save(data);

    return result;
  }

  async delete(id: string): Promise<number> {
    const data = await this.ormRepository.delete(id);

    if (data.affected) {
      return data.affected;
    }

    throw new AppError('Não foi possível deletar o produto.');
  }

  async findById(id: string): Promise<Product | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }

  async showAll(): Promise<Product[]> {
    const data = await this.ormRepository.find();

    return data;
  }

  async update(product: Product): Promise<Product> {
    const data = await this.ormRepository.save(product);

    return data;
  }
}
