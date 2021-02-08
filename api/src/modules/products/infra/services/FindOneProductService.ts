import IProductsRepository from '@modules/products/interfaces/IProductsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '../typeorm/entities/Products';

@injectable()
export default class FindOneProductsService {
  private productsRepository: IProductsRepository;

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
