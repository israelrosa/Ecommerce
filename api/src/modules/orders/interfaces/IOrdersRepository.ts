import Order from '../infra/typeorm/entities/Order';
import ICreateOrderDTO from './dtos/ICreateOrderDTO';

export default interface IOrdersRepository {
  create(data: ICreateOrderDTO): Promise<Order>;
  update(order: Order): Promise<Order>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Order | undefined>;
  findByUserId(userId: string): Promise<Order[]>;
  findByProductId(productId: string): Promise<Order[]>;
  userFindByProductId(productId: string, userId: string): Promise<Order[]>;
  showAll(): Promise<Order[]>;
}
