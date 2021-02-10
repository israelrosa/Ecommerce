import ILocationsRepository from '@modules/locations/interfaces/ILocationsRepository';
import IOrderStatusRepository from '@modules/orders/dependencies/orderStatus/interfaces/IOrderStatusRepository';
import IOrdersRepository from '@modules/orders/interfaces/IOrdersRepository';
import IPaymentsRepository from '@modules/payments/interfaces/IPaymentsRepository';
import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Order from '../typeorm/entities/Order';

interface IParams {
  locationId: string;
  paymentId: string;
  userId: string;
}

@injectable()
export default class CreateOrderService {
  private ordersRepository: IOrdersRepository;

  private orderStatusRepository: IOrderStatusRepository;

  private locationsRepository: ILocationsRepository;

  private usersRepository: IUsersRepository;

  private paymentsRepository: IPaymentsRepository;

  constructor(
    @inject('OrdersRepository') ordersRepository: IOrdersRepository,
    @inject('OrderStatusRepository')
    orderStatusRepository: IOrderStatusRepository,
    @inject('UsersRepository') usersRepository: IUsersRepository,
    @inject('LocationsRepository') locationsRepository: ILocationsRepository,
    @inject('PaymentsRepository') paymentsRepository: IPaymentsRepository,
  ) {
    this.ordersRepository = ordersRepository;
    this.orderStatusRepository = orderStatusRepository;
    this.locationsRepository = locationsRepository;
    this.paymentsRepository = paymentsRepository;
    this.usersRepository = usersRepository;
  }

  async execute({ locationId, paymentId, userId }: IParams): Promise<Order> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('O usuário não existe.');
    }

    const location = await this.locationsRepository.findById(locationId);

    if (!location) {
      throw new AppError('A localização não existe.');
    }

    const payment = await this.paymentsRepository.findById(paymentId);

    if (!payment) {
      throw new AppError('O cartão não existe.');
    }

    const status = await this.orderStatusRepository.findByStatus('Aberto');

    if (!status) {
      throw new AppError('O status não foi encontrado.', 500);
    }

    const data = await this.ordersRepository.create({
      locationId,
      orderStatusId: status.id,
      paymentId,
      userId,
    });

    return data;
  }
}
