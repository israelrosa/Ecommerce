import IAdminRepository from '@modules/admin/interfaces/IAdminRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IOrderStatusRepository from '../../interfaces/IOrderStatusRepository';

@injectable()
export default class DeleteOrderStatusService {
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

  async execute(id: string, adminId: string): Promise<void> {
    const admin = await this.adminRepository.findById(adminId);

    if (!admin) {
      throw new AppError('O ADM não existe.');
    }

    if (!admin.type.deleteOrderStatus) {
      throw new AppError('O ADM não tem permissão.');
    }

    await this.orderStatusRepository.delete(id);
  }
}
