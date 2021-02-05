import IProductsRepository from '@modules/products/interfaces/IProductsRepository';
import AppError from '@shared/errors/AppError';
import { inject } from 'tsyringe';
import Product from '../typeorm/entities/Products';

export default class ShowAllProductsService {
  productsRepository: IProductsRepository;

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
