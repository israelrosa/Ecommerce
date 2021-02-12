import OrderProduct from '../infra/typeorm/entities/OrderProduct';
import ICreateOrderProductDTO from './dtos/ICreateOrderProductDTO';

export default interface IOrderProductsRepository {
  create(data: ICreateOrderProductDTO): Promise<OrderProduct>;

  delete(id: string): Promise<void>;

  findById(id: string): Promise<OrderProduct | undefined>;

  findByProductId(productId: string): Promise<OrderProduct[]>;

  findByOrderId(orderId: string): Promise<OrderProduct[]>;

  userFindByProductId(
    productId: string,
    userId: string,
  ): Promise<OrderProduct[]>;

  showAll(): Promise<OrderProduct[]>;
}
