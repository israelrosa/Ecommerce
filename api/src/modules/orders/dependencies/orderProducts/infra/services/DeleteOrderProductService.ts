import IAdminRepository from '@modules/admin/interfaces/IAdminRepository';
import IOrdersRepository from '@modules/orders/interfaces/IOrdersRepository';
import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IOrderProductsRepository from '../../interfaces/IOrderProductsRepository';

@injectable()
export default class DeleteOrderProductService {
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

  async execute(id: string, userId: string, isAdmin: boolean): Promise<void> {
    if (isAdmin) {
      const admin = await this.adminRepository.findById(userId);

      if (!admin) {
        throw new AppError('O ADM não existe.');
      }

      if (!admin.type.deleteOrderProducts) {
        throw new AppError('O ADM não tem permissão.');
      }

      await this.orderProductsRepository.delete(id);
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('O usuário não existe');
    }
    await this.orderProductsRepository.delete(id);
  }
}
