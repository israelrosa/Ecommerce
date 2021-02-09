import ICreatePaymentDTO from '@modules/payments/interfaces/dtos/ICreatePaymentDTO';
import IPaymentsRepository from '@modules/payments/interfaces/IPaymentsRepository';
import AppError from '@shared/errors/AppError';
import { getRepository, Repository } from 'typeorm';
import Payment from '../entities/Payment';

export default class PaymentsRepository implements IPaymentsRepository {
  private ormRepository: Repository<Payment>;

  constructor() {
    this.ormRepository = getRepository(Payment);
  }

  async create({
    cardNumber,
    expirationDate,
    holder,
    securityCode,
    userId,
  }: ICreatePaymentDTO): Promise<Payment> {
    const data = await this.ormRepository.create({
      cardNumber,
      expirationDate,
      holder,
      securityCode,
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

  async findById(id: string): Promise<Payment | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }

  async findByUserId(userId: string): Promise<Payment[]> {
    const data = await this.ormRepository.find({ where: { userId } });

    return data;
  }

  async update(payment: Payment): Promise<Payment> {
    const data = await this.ormRepository.save(payment);

    return data;
  }
}
