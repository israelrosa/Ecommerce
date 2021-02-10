import ILocationsRepository from '@modules/locations/interfaces/ILocationsRepository';
import IOrdersRepository from '@modules/orders/interfaces/IOrdersRepository';
import IPaymentsRepository from '@modules/payments/interfaces/IPaymentsRepository';
import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject } from 'tsyringe';
import Order from '../typeorm/entities/Order';

interface IParams {
  id: string;
  locationId: string;
  paymentId: string;
  userId: string;
}

export default class UpdateOrderService {
  private ordersRepository: IOrdersRepository;

  private locationsRepository: ILocationsRepository;

  private usersRepository: IUsersRepository;

  private paymentsRepository: IPaymentsRepository;

  constructor(
    @inject('OrdersRepository') ordersRepository: IOrdersRepository,
    @inject('UsersRepository') usersRepository: IUsersRepository,
    @inject('LocationsRepository') locationsRepository: ILocationsRepository,
    @inject('PaymentsRepository') paymentsRepository: IPaymentsRepository,
  ) {
    this.ordersRepository = ordersRepository;
    this.locationsRepository = locationsRepository;
    this.paymentsRepository = paymentsRepository;
    this.usersRepository = usersRepository;
  }

  async execute({
    id,
    locationId,
    paymentId,
    userId,
  }: IParams): Promise<Order> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new AppError('O pedido não existe.');
    }

    if (order.orderStatus.status !== 'Aberto') {
      throw new AppError(
        'Só é possível atualizar pedidos com o status "Aberto".',
      );
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('O usuário não existe.');
    }

    if (user.id !== order.userId) {
      throw new AppError(
        'O usuário não tem permissão para atualizar um pedido que não é seu.',
      );
    }

    const location = await this.locationsRepository.findById(locationId);

    if (!location) {
      throw new AppError('A localização não existe.');
    }

    const payment = await this.paymentsRepository.findById(paymentId);

    if (!payment) {
      throw new AppError('O cartão não existe.');
    }

    Object.assign(order, {
      locationId,
      paymentId,
    });

    const data = await this.ordersRepository.update(order);

    return data;
  }
}
