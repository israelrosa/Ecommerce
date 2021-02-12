import IOrdersRepository from '@modules/orders/interfaces/IOrdersRepository';
import IProductsRepository from '@modules/products/interfaces/IProductsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICreateOrderProductDTO from '../../interfaces/dtos/ICreateOrderProductDTO';
import IOrderProductsRepository from '../../interfaces/IOrderProductsRepository';
import OrderProduct from '../typeorm/entities/OrderProduct';

interface IParams extends ICreateOrderProductDTO {
  userId: string;
}

@injectable()
export default class CreateOrderProductService {
  private orderProductsRepository: IOrderProductsRepository;

  private ordersRepository: IOrdersRepository;

  private productsRepository: IProductsRepository;

  constructor(
    @inject('OrderProductsRepository')
    orderProductsRepository: IOrderProductsRepository,
    @inject('OrdersRepository') ordersRepository: IOrdersRepository,
    @inject('ProductsRepository') productsRepository: IProductsRepository,
  ) {
    this.orderProductsRepository = orderProductsRepository;
    this.ordersRepository = ordersRepository;
    this.productsRepository = productsRepository;
  }

  async execute({
    orderId,
    productId,
    userId,
  }: IParams): Promise<OrderProduct> {
    const order = await this.ordersRepository.findById(orderId);

    if (!order) {
      throw new AppError('O pedido não existe.');
    }

    if (userId !== order.userId) {
      throw new AppError(
        'O usuário não tem permissão para inserir dados no pedido.',
      );
    }

    const product = await this.productsRepository.findById(productId);

    if (!product) {
      throw new AppError('O produto não existe.');
    }

    const data = await this.orderProductsRepository.create({
      orderId,
      productId,
    });

    return data;
  }
}
