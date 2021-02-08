import IProductsRepository from '@modules/products/interfaces/IProductsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '../typeorm/entities/Products';

interface IParams {
  productId: string;
  title: string;
  description: string;
  price: number;
  discount?: number;
  categoryId: string;
}
@injectable()
export default class UpdateProductsService {
  private productsRepository: IProductsRepository;

  constructor(
    @inject('ProductsRepository') productsRepository: IProductsRepository,
  ) {
    this.productsRepository = productsRepository;
  }

  async execute({
    productId,
    categoryId,
    description,
    price,
    title,
    discount,
  }: IParams): Promise<Product> {
    const product = await this.productsRepository.findById(productId);

    if (!product) {
      throw new AppError('O produto não existe.');
    }

    Object.assign(product, {
      categoryId,
      description,
      price,
      title,
      discount,
    });

    const data = await this.productsRepository.update(product);

    return data;
  }
}
