import ProductPhoto from '../infra/typeorm/entities/ProductPhoto';

export default interface IProductPhotosRepository {
  create(name: string, productId: string): Promise<ProductPhoto>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<ProductPhoto | undefined>;
}
