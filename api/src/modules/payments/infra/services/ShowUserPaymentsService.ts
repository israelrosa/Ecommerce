import IPaymentsRepository from '@modules/payments/interfaces/IPaymentsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Payment from '../typeorm/entities/Payment';

@injectable()
export default class ShowUserPaymentsService {
  private paymentsRepository: IPaymentsRepository;

  constructor(
    @inject('PaymentsRepository') paymentsRepository: IPaymentsRepository,
  ) {
    this.paymentsRepository = paymentsRepository;
  }

  async execute(userId: string): Promise<Payment[]> {
    const data = await this.paymentsRepository.findByUserId(userId);

    if (data.length === 0) {
      throw new AppError('O usuário não tem tipos de pagamentos salvos.');
    }

    return data;
  }
}
