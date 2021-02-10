import OrderStatus from '../infra/typeorm/entities/OrderStatus';

export default interface IOrderStatusRepository {
  create(status: string): Promise<OrderStatus>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<OrderStatus | undefined>;
  findByStatus(status: string): Promise<OrderStatus | undefined>;
  showAll(): Promise<OrderStatus[]>;
}
