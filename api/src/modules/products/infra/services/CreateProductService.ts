import ICreateProductDTO from '@modules/products/interfaces/dtos/ICreateProductDTO';
import IProductsRepository from '@modules/products/interfaces/IProductsRepository';
import { inject, injectable } from 'tsyringe';
import Product from '../typeorm/entities/Products';

@injectable()
export default class CreateProductsService {
  productsRepository: IProductsRepository;

  constructor(
    @inject('ProductsRepository') productsRepository: IProductsRepository,
  ) {
    this.productsRepository = productsRepository;
  }

  async execute({
    categoryId,
    description,
    price,
    title,
    discount,
  }: ICreateProductDTO): Promise<Product> {
    const data = await this.productsRepository.create({
      categoryId,
      description,
      price,
      title,
      discount,
    });

    return data;
  }
}
