import IProductsRepository from '@modules/products/interfaces/IProductsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '../typeorm/entities/Products';

@injectable()
export default class ShowAllProductsService {
  private productsRepository: IProductsRepository;

  constructor(
    @inject('ProductsRepository') productsRepository: IProductsRepository,
  ) {
    this.productsRepository = productsRepository;
  }

  async execute(): Promise<Product[]> {
    const data = await this.productsRepository.showAll();

    if (data.length === 0) {
      throw new AppError('Não há produtos cadastrados.');
    }
    return data;
  }
}
