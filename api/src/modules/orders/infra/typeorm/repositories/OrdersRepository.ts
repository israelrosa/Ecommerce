import ICreateOrderDTO from '@modules/orders/interfaces/dtos/ICreateOrderDTO';
import IOrdersRepository from '@modules/orders/interfaces/IOrdersRepository';
import AppError from '@shared/errors/AppError';
import { getRepository, Repository } from 'typeorm';
import Order from '../entities/Order';

export default class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  async create({
    locationId,
    orderStatusId,
    paymentId,
    userId,
  }: ICreateOrderDTO): Promise<Order> {
    const data = await this.ormRepository.create({
      locationId,
      orderStatusId,
      paymentId,
      userId,
    });

    const result = await this.ormRepository.save(data);

    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await this.ormRepository.delete(id);

    if (!result.affected) {
      throw new AppError('Não foi possível deletar a localização.');
    }
  }

  async findById(id: string): Promise<Order | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }

  async findByUserId(userId: string): Promise<Order[]> {
    const data = await this.ormRepository.find({ where: { userId } });

    return data;
  }

  async update(order: Order): Promise<Order> {
    const data = await this.ormRepository.save(order);

    return data;
  }

  async showAll(): Promise<Order[]> {
    const data = await this.ormRepository.find();

    return data;
  }

  async findByProductId(productId: string): Promise<Order[]> {
    const data = await this.ormRepository.find({
      relations: ['orderProducts'],
      where: { orderProducts: { productId } },
    });

    return data;
  }

  async userFindByProductId(
    userId: string,
    productId: string,
  ): Promise<Order[]> {
    const data = await this.ormRepository.find({
      relations: ['orderProducts'],
      where: { userId, orderProducts: { productId } },
    });

    return data;
  }
}
