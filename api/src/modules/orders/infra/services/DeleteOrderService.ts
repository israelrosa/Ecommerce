import IAdminRepository from '@modules/admin/interfaces/IAdminRepository';
import IOrdersRepository from '@modules/orders/interfaces/IOrdersRepository';
import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class DeleteOrderService {
  private ordersRepository: IOrdersRepository;

  private usersRepository: IUsersRepository;

  private adminRepository: IAdminRepository;

  constructor(
    @inject('OrdersRepository') ordersRepository: IOrdersRepository,
    @inject('UsersRepository') usersRepository: IUsersRepository,
    @inject('AdminRepository') adminRepository: IAdminRepository,
  ) {
    this.ordersRepository = ordersRepository;
    this.usersRepository = usersRepository;
    this.adminRepository = adminRepository;
  }

  async execute(id: string, userId: string, isAdmin: boolean): Promise<void> {
    if (isAdmin) {
      const admin = await this.adminRepository.findById(userId);

      if (!admin) {
        throw new AppError('O ADM não existe.');
      }

      await this.ordersRepository.delete(id);
    } else {
      const user = await this.usersRepository.findById(userId);

      if (!user) {
        throw new AppError('O usuário não existe.');
      }

      const order = await this.ordersRepository.findById(id);

      if (!order) {
        throw new AppError('O pedido não existe');
      }

      if (order.orderStatus.status !== 'Aberto') {
        throw new AppError(
          'O pedido só pode ser deletado se o status for "Aberto".',
        );
      }

      await this.ordersRepository.delete(id);
    }
  }
}
