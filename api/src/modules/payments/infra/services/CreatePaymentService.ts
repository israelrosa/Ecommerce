import ICreatePaymentDTO from '@modules/payments/interfaces/dtos/ICreatePaymentDTO';
import IPaymentsRepository from '@modules/payments/interfaces/IPaymentsRepository';
import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Payment from '../typeorm/entities/Payment';

@injectable()
export default class CreatePaymentService {
  private paymentsRepository: IPaymentsRepository;

  private usersRepository: IUsersRepository;

  constructor(
    @inject('PaymentsRepository') paymentsRepository: IPaymentsRepository,
    @inject('UsersRepository') usersRepository: IUsersRepository,
  ) {
    this.paymentsRepository = paymentsRepository;
    this.usersRepository = usersRepository;
  }

  async execute({
    cardNumber,
    expirationDate,
    holder,
    securityCode,
    userId,
  }: ICreatePaymentDTO): Promise<Payment> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('O usuário não foi encontrado.');
    }

    const data = await this.paymentsRepository.create({
      cardNumber,
      expirationDate,
      holder,
      securityCode,
      userId,
    });

    return data;
  }
}
