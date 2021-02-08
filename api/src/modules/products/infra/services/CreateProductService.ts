import IAdminRepository from '@modules/admin/interfaces/IAdminRepository';
import ICreateProductDTO from '@modules/products/interfaces/dtos/ICreateProductDTO';
import IProductsRepository from '@modules/products/interfaces/IProductsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '../typeorm/entities/Products';

interface IParams extends ICreateProductDTO {
  adminId: string;
}

@injectable()
export default class CreateProductsService {
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
    adminId,
    categoryId,
    description,
    price,
    title,
    discount,
  }: IParams): Promise<Product> {
    const admin = await this.adminRepository.findById(adminId);

    if (!admin) {
      throw new AppError('Apenas admins podem criar produtos.');
    }

    if (!admin.type.createProducts) {
      throw new AppError('O ADM não tem permissão.');
    }

    const data = await this.productsRepository.create({
      categoryId,
      description,
      price,
      title,
      discount,
    });

    return data;
  }
}
