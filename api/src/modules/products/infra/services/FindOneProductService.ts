import IProductsRepository from '@modules/products/interfaces/IProductsRepository';
import AppError from '@shared/errors/AppError';
import { inject } from 'tsyringe';
import Product from '../typeorm/entities/Products';

export default class FindOneProductsService {
  productsRepository: IProductsRepository;

  constructor(
    @inject('ProductsRepository') productsRepository: IProductsRepository,
  ) {
    this.productsRepository = productsRepository;
  }

  async execute(productId: string): Promise<Product> {
    const data = await this.productsRepository.findById(productId);

    if (!data) {
      throw new AppError('O produto não existe.');
    }

    return data;
  }
}
