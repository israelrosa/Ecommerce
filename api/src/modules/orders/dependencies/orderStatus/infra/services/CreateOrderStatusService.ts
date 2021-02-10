import IAdminRepository from '@modules/admin/interfaces/IAdminRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IOrderStatusRepository from '../../interfaces/IOrderStatusRepository';
import OrderStatus from '../typeorm/entities/OrderStatus';

@injectable()
export default class CreateOrderStatusService {
  private orderStatusRepository: IOrderStatusRepository;

  private adminRepository: IAdminRepository;

  constructor(
    @inject('OrderStatusRepository')
    orderStatusRepository: IOrderStatusRepository,
    @inject('AdminRepository') adminRepository: IAdminRepository,
  ) {
    this.orderStatusRepository = orderStatusRepository;
    this.adminRepository = adminRepository;
  }

  async execute(adminId: string, status: string): Promise<OrderStatus> {
    const admin = await this.adminRepository.findById(adminId);

    if (!admin) {
      throw new AppError('O ADM não existe.');
    }

    if (!admin.type.createOrderStatus) {
      throw new AppError('O ADM não tem permissão.');
    }

    const result = await this.orderStatusRepository.create(status);

    return result;
  }
}
