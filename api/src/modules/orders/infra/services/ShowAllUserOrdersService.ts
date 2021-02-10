import IOrdersRepository from '@modules/orders/interfaces/IOrdersRepository';
import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject } from 'tsyringe';
import Order from '../typeorm/entities/Order';

export default class ShowAllUserOrdersService {
  private ordersRepository: IOrdersRepository;

  private usersRepository: IUsersRepository;

  constructor(
    @inject('OrdersRepository') ordersRepository: IOrdersRepository,
    @inject('UsersRepository') usersRepository: IUsersRepository,
  ) {
    this.ordersRepository = ordersRepository;
    this.usersRepository = usersRepository;
  }

  async execute(userId: string): Promise<Order[]> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('O usuário não existe.');
    }

    const data = await this.ordersRepository.findByUserId(userId);

    return data;
  }
}
