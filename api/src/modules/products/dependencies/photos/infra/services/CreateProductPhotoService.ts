import IAdminRepository from '@modules/admin/interfaces/IAdminRepository';
import IProductsRepository from '@modules/products/interfaces/IProductsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IProductPhotosRepository from '../../interface/IProductPhotosRepository';
import ProductPhoto from '../typeorm/entities/ProductPhoto';

interface IParams {
  adminId: string;
  productId: string;
  name: string;
}

@injectable()
export default class CreateProductPhotoService {
  private productPhotosRepository: IProductPhotosRepository;

  private productsRepository: IProductsRepository;

  private adminRepository: IAdminRepository;

  constructor(
    @inject('ProductPhotosRepository')
    productPhotosRepository: IProductPhotosRepository,
    @inject('ProductsRepository') productsRepository: IProductsRepository,
    @inject('AdminRepository') adminRepository: IAdminRepository,
  ) {
    this.productPhotosRepository = productPhotosRepository;
    this.productsRepository = productsRepository;
    this.adminRepository = adminRepository;
  }

  async execute({ name, productId, adminId }: IParams): Promise<ProductPhoto> {
    const product = await this.productsRepository.findById(productId);

    if (!product) {
      throw new AppError('O produto não existe.');
    }

    const admin = await this.adminRepository.findById(adminId);

    if (!admin) {
      throw new AppError('O usuário não tem permissão ou não existe.');
    }

    if (!admin.type.createProducts) {
      throw new AppError('O ADM não tem permissão.');
    }

    const data = await this.productPhotosRepository.create(name, productId);

    return data;
  }
}
