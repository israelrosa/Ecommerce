import IAdminRepository from '@modules/admin/interfaces/IAdminRepository';
import IOrdersRepository from '@modules/orders/interfaces/IOrdersRepository';
import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IOrderProductsRepository from '../../interfaces/IOrderProductsRepository';
import OrderProduct from '../typeorm/entities/OrderProduct';

@injectable()
export default class ShowAllOrderProductsService {
  private orderProductsRepository: IOrderProductsRepository;

  private ordersRepository: IOrdersRepository;

  private adminRepository: IAdminRepository;

  private usersRepository: IUsersRepository;

  constructor(
    @inject('OrderProductsRepository')
    orderProductsRepository: IOrderProductsRepository,
    @inject('OrdersRepository') ordersRepository: IOrdersRepository,
    @inject('AdminRepository') adminRepository: IAdminRepository,
    @inject('UsersRepository') usersRepository: IUsersRepository,
  ) {
    this.orderProductsRepository = orderProductsRepository;
    this.ordersRepository = ordersRepository;
    this.adminRepository = adminRepository;
    this.usersRepository = usersRepository;
  }

  async execute(
    orderId: string,
    userId: string,
    isAdmin: boolean,
  ): Promise<OrderProduct[]> {
    const order = await this.ordersRepository.findById(orderId);

    if (!order) {
      throw new AppError('O pedido não existe.');
    }

    if (isAdmin) {
      const admin = await this.adminRepository.findById(userId);

      if (!admin) {
        throw new AppError('O ADM não existe.');
      }

      const data = await this.orderProductsRepository.findByOrderId(orderId);

      return data;
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('O usuário não existe.');
    }

    if (userId !== order.userId) {
      throw new AppError(
        'O usuário não tem permissão para acessar esses dados.',
      );
    }
    const data = await this.orderProductsRepository.findByOrderId(orderId);

    return data;
  }
}
