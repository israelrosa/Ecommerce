import IOrderStatusRepository from '@modules/orders/dependencies/orderStatus/interfaces/IOrderStatusRepository';
import { v4 as uuid } from 'uuid';
import OrderStatus from '../../entities/OrderStatus';

export default class FakeOrderStatusRepository
  implements IOrderStatusRepository {
  private status: OrderStatus[] = [
    { id: uuid(), status: 'Aberto' },
    { id: uuid(), status: 'Cancelado' },
    { id: uuid(), status: 'Encaminhado' },
    { id: uuid(), status: 'Finalizado' },
  ];

  async create(status: string): Promise<OrderStatus> {
    const orderStatus = new OrderStatus();

    Object.assign(orderStatus, {
      id: uuid(),
      status,
    });

    this.status.push(orderStatus);

    return orderStatus;
  }

  async delete(id: string): Promise<void> {
    const index = this.status.findIndex(st => st.id === id);

    this.status.splice(index, 1);
  }

  async findById(id: string): Promise<OrderStatus | undefined> {
    const data = this.status.find(st => st.id === id);
    return data;
  }

  async findByStatus(status: string): Promise<OrderStatus | undefined> {
    const data = this.status.find(st => st.status === status);
    return data;
  }

  async showAll(): Promise<OrderStatus[]> {
    return this.status;
  }
}
