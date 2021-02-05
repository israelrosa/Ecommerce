import ICreateProductDTO from '@modules/products/interfaces/dtos/ICreateProductDTO';
import IProductsRepository from '@modules/products/interfaces/IProductsRepository';
import { v4 as uuid } from 'uuid';
import Product from '../../entities/Products';

export default class FakeProductsRepository implements IProductsRepository {
  products: Product[] = [];

  async create({
    categoryId,
    description,
    price,
    title,
    discount,
  }: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, {
      id: uuid(),
      categoryId,
      description,
      price,
      title,
      discount,
    });

    this.products.push(product);

    return product;
  }

  async delete(id: string): Promise<number> {
    const index = this.products.findIndex(pd => pd.id === id);

    const result = this.products.splice(index, 1);

    return result.length;
  }

  async findById(id: string): Promise<Product | undefined> {
    const product = this.products.find(pd => pd.id === id);

    return product;
  }

  async showAll(): Promise<Product[]> {
    return this.products;
  }

  async update(product: Product): Promise<Product> {
    const index = this.products.findIndex(pd => pd.id === product.id);

    this.products[index] = product;

    return this.products[index];
  }
}
