import IAdminRepository from '@modules/admin/interfaces/IAdminRepository';
import IProductsRepository from '@modules/products/interfaces/IProductsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class DeleteProductsService {
  private productsRepository: IProductsRepository;

  private adminRepository: IAdminRepository;

  constructor(
    @inject('ProductsRepository') productsRepository: IProductsRepository,
    @inject('AdminRepository') adminRepository: IAdminRepository,
  ) {
    this.productsRepository = productsRepository;
    this.adminRepository = adminRepository;
  }

  async execute(productId: string, adminId: string): Promise<void> {
    const admin = await this.adminRepository.findById(adminId);

    if (!admin) {
      throw new AppError('Apenas admins podem criar produtos.');
    }

    if (!admin.type.deleteProducts) {
      throw new AppError('O ADM não tem permissão.');
    }

    const product = await this.productsRepository.findById(productId);

    if (!product) {
      throw new AppError('O produto não existe.');
    }

    await this.productsRepository.delete(productId);
  }
}
