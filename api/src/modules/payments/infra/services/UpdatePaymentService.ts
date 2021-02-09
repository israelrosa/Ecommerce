import IPaymentsRepository from '@modules/payments/interfaces/IPaymentsRepository';
import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Payment from '../typeorm/entities/Payment';

interface IParams {
  id: string;
  cardNumber: string;
  expirationDate: string;
  holder: string;
  securityCode: string;
  userId: string;
}

@injectable()
export default class UpdatePaymentService {
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
    id,
    cardNumber,
    expirationDate,
    holder,
    securityCode,
    userId,
  }: IParams): Promise<Payment> {
    const card = await this.paymentsRepository.findById(id);

    if (!card) {
      throw new AppError('O cartão não existe.');
    }
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('O usuário não existe.');
    }

    if (userId !== card.userId) {
      throw new AppError(
        'O usuário não pode atualizar um cartão que não o pertence',
      );
    }

    Object.assign(card, {
      cardNumber,
      expirationDate,
      holder,
      securityCode,
    });

    const result = await this.paymentsRepository.update(card);

    return result;
  }
}
