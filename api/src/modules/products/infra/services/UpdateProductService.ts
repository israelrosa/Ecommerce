import IAdminRepository from '@modules/admin/interfaces/IAdminRepository';
import IProductsRepository from '@modules/products/interfaces/IProductsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '../typeorm/entities/Products';

interface IParams {
  adminId: string;
  productId: string;
  title: string;
  description: string;
  price: number;
  discount?: number;
  categoryId: string;
}
@injectable()
export default class UpdateProductService {
  private productsRepository: IProductsRepository;

  private adminRepository: IAdminRepository;

  constructor(
    @inject('ProductsRepository') productsRepository: IProductsRepository,
    @inject('AdminRepository') adminRepository: IAdminRepository,
  ) {
    this.productsRepository = productsRepository;
    this.adminRepository = adminRepository;
  }

  async execute({
    productId,
    categoryId,
    description,
    price,
    title,
    discount,
    adminId,
  }: IParams): Promise<Product> {
    const admin = await this.adminRepository.findById(adminId);

    if (!admin) {
      throw new AppError('Apenas admins podem criar produtos.');
    }

    if (!admin.type.updateProducts) {
      throw new AppError('O ADM não tem permissão.');
    }

    const product = await this.productsRepository.findById(productId);

    if (!product) {
      throw new AppError('O produto não existe.');
    }

    Object.assign(product, {
      categoryId,
      description,
      price,
      title,
      discount,
    });

    const data = await this.productsRepository.update(product);

    return data;
  }
}
