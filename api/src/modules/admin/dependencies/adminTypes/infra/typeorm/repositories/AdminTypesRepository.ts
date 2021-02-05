import AppError from '@shared/errors/AppError';
import { getRepository, Repository } from 'typeorm';
import IAdminTypesRepository from '../../../interfaces/IAdminTypesRepository';
import AdminType from '../entities/AdminType';

export default class AdminTypesRepository implements IAdminTypesRepository {
  ormRepository: Repository<AdminType>;

  constructor() {
    this.ormRepository = getRepository(AdminType);
  }

  async create(type: string): Promise<AdminType> {
    const data = await this.ormRepository.create({ type });

    const result = await this.ormRepository.save(data);

    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await this.ormRepository.delete(id);

    if (!result.affected) {
      throw new AppError('Não foi possível deletar.');
    }
  }

  async update(adminType: AdminType): Promise<AdminType> {
    const result = await this.ormRepository.save(adminType);

    return result;
  }

  async findById(id: string): Promise<AdminType | undefined> {
    const result = await this.ormRepository.findOne(id);
    return result;
  }

  async findByTypeName(typeName: string): Promise<AdminType | undefined> {
    const result = await this.ormRepository.findOne({
      where: { type: typeName },
    });
    return result;
  }
}
