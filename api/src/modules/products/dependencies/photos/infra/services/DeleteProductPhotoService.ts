import IAdminRepository from '@modules/admin/interfaces/IAdminRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IProductPhotosRepository from '../../interface/IProductPhotosRepository';

@injectable()
export default class DeleteProductPhotoService {
  private productPhotosRepository: IProductPhotosRepository;

  private adminRepository: IAdminRepository;

  constructor(
    @inject('ProductPhotosRepository')
    productPhotosRepository: IProductPhotosRepository,
    @inject('AdminRepository') adminRepository: IAdminRepository,
  ) {
    this.productPhotosRepository = productPhotosRepository;
    this.adminRepository = adminRepository;
  }

  async execute(id: string, adminId: string): Promise<void> {
    const admin = await this.adminRepository.findById(adminId);
    if (!admin) {
      throw new AppError('O usuário não tem permissão ou não existe.');
    }

    if (!admin.type.deleteProducts) {
      throw new AppError('O ADM não tem permissão.');
    }

    const photo = await this.productPhotosRepository.findById(id);

    if (!photo) {
      throw new AppError('A foto não existe.');
    }

    await this.productPhotosRepository.delete(id);
  }
}
