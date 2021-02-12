import AppError from '@shared/errors/AppError';
import { getRepository, Repository } from 'typeorm';
import ICreateOrderProductDTO from '../../../interfaces/dtos/ICreateOrderProductDTO';
import IOrderProductsRepository from '../../../interfaces/IOrderProductsRepository';
import OrderProduct from '../entities/OrderProduct';

export default class OrderProductsRepository
  implements IOrderProductsRepository {
  private ormRepository: Repository<OrderProduct>;

  constructor() {
    this.ormRepository = getRepository(OrderProduct);
  }

  async create({
    orderId,
    productId,
  }: ICreateOrderProductDTO): Promise<OrderProduct> {
    const data = await this.ormRepository.create({
      orderId,
      productId,
    });

    const result = await this.ormRepository.save(data);

    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await this.ormRepository.delete(id);

    if (!result.affected) {
      throw new AppError('Não foi possível deletar o produto do pedido.');
    }
  }

  async findById(id: string): Promise<OrderProduct | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }

  async showAll(): Promise<OrderProduct[]> {
    const data = await this.ormRepository.find();

    return data;
  }

  async findByProductId(productId: string): Promise<OrderProduct[]> {
    const data = await this.ormRepository.find({
      where: { productId },
    });

    return data;
  }

  async findByOrderId(orderId: string): Promise<OrderProduct[]> {
    const data = await this.ormRepository.find({ where: { orderId } });

    return data;
  }

  async userFindByProductId(
    userId: string,
    productId: string,
  ): Promise<OrderProduct[]> {
    const data = await this.ormRepository.find({
      relations: ['order'],
      where: { productId, order: { userId } },
    });

    return data;
  }
}
