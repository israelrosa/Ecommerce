import AppError from '@shared/errors/AppError';
import { getRepository, Repository } from 'typeorm';
import IOrderStatusRepository from '../../../interfaces/IOrderStatusRepository';
import OrderStatus from '../entities/OrderStatus';

export default class OrderStatusRepository implements IOrderStatusRepository {
  private ormRepository: Repository<OrderStatus>;

  constructor() {
    this.ormRepository = getRepository(OrderStatus);
  }

  async create(status: string): Promise<OrderStatus> {
    const data = await this.ormRepository.create({ status });

    const result = await this.ormRepository.save(data);

    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await this.ormRepository.delete(id);

    if (!result.affected) {
      throw new AppError('Não foi possível deletar o status.');
    }
  }

  async findById(id: string): Promise<OrderStatus | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }

  async findByStatus(status: string): Promise<OrderStatus | undefined> {
    const data = await this.ormRepository.findOne({ where: { status } });

    return data;
  }

  async showAll(): Promise<OrderStatus[]> {
    const data = await this.ormRepository.find();

    return data;
  }
}
