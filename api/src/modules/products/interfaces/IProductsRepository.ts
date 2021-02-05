import Product from '../infra/typeorm/entities/Products';
import ICreateProductDTO from './dtos/ICreateProductDTO';

export default interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  delete(id: string): Promise<number>;
  update(product: Product): Promise<Product>;
  showAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | undefined>;
}
