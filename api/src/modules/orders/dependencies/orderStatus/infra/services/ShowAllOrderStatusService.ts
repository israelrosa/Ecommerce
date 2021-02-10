import { inject, injectable } from 'tsyringe';
import IOrderStatusRepository from '../../interfaces/IOrderStatusRepository';
import OrderStatus from '../typeorm/entities/OrderStatus';

@injectable()
export default class ShowAllOrderStatusService {
  private orderStatusRepository: IOrderStatusRepository;

  constructor(
    @inject('OrderStatusRepository')
    orderStatusRepository: IOrderStatusRepository,
  ) {
    this.orderStatusRepository = orderStatusRepository;
  }

  async execute(): Promise<OrderStatus[]> {
    const data = await this.orderStatusRepository.showAll();

    return data;
  }
}
