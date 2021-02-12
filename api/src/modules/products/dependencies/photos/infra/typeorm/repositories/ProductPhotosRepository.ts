import AppError from '@shared/errors/AppError';
import { getRepository, Repository } from 'typeorm';
import IProductPhotosRepository from '../../../interface/IProductPhotosRepository';
import ProductPhoto from '../entities/ProductPhoto';

export default class ProductPhotosRepository
  implements IProductPhotosRepository {
  private ormRepository: Repository<ProductPhoto>;

  constructor() {
    this.ormRepository = getRepository(ProductPhoto);
  }

  async create(name: string, productId: string): Promise<ProductPhoto> {
    const data = await this.ormRepository.create({ name, productId });

    const result = await this.ormRepository.save(data);

    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await this.ormRepository.delete(id);

    if (!result.affected) {
      throw new AppError('Não foi possível deletar a foto.');
    }
  }

  async findById(id: string): Promise<ProductPhoto | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }
}
