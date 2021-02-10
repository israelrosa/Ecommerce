import IAdminRepository from '@modules/admin/interfaces/IAdminRepository';
import IOrdersRepository from '@modules/orders/interfaces/IOrdersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Order from '../typeorm/entities/Order';

@injectable()
export default class ShowAllOrdersSevice {
  private ordersRepository: IOrdersRepository;

  private adminRepository: IAdminRepository;

  constructor(
    @inject('OrdersRepository') ordersRepository: IOrdersRepository,
    @inject('AdminRepository') adminRepository: IAdminRepository,
  ) {
    this.ordersRepository = ordersRepository;
    this.adminRepository = adminRepository;
  }

  async execute(adminId: string): Promise<Order[]> {
    const admin = await this.adminRepository.findById(adminId);

    if (!admin) {
      throw new AppError('O ADM não existe.');
    }

    const data = await this.ordersRepository.showAll();

    if (data.length === 0) {
      throw new AppError('Não foram encontrados resultados.');
    }

    return data;
  }
}
