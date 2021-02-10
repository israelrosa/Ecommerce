import ICreateOrderDTO from '@modules/orders/interfaces/dtos/ICreateOrderDTO';
import Order from '../../entities/Order';

export default class FakeOrdersRepository {
  private orders: Order[] = [];

  async create({
    locationId,
    orderStatusId,
    paymentId,
    userId,
  }: ICreateOrderDTO): Promise<Order> {
    const order = new Order();

    Object.assign(order, {
      locationId,
      orderStatusId,
      paymentId,
      userId,
    });

    this.orders.push(order);

    return order;
  }

  async delete(id: string): Promise<void> {
    const index = this.orders.findIndex(py => py.id === id);

    this.orders.splice(index, 1);
  }

  async findById(id: string): Promise<Order | undefined> {
    const data = this.orders.find(py => py.id === id);
    return data;
  }

  async findByUserId(userId: string): Promise<Order[]> {
    const data = this.orders.filter(py => py.userId === userId);
    return data;
  }

  async update(order: Order): Promise<Order> {
    const index = this.orders.findIndex(py => py.id === order.id);

    this.orders[index] = order;

    return this.orders[index];
  }

  async showAll(): Promise<Order[]> {
    return this.orders;
  }
}
