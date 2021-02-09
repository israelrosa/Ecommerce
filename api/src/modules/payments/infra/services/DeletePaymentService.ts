import IPaymentsRepository from '@modules/payments/interfaces/IPaymentsRepository';
import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IParams {
  userId: string;
  id: string;
}

@injectable()
export default class DeletePaymentService {
  private paymentsRepository: IPaymentsRepository;

  private usersRepository: IUsersRepository;

  constructor(
    @inject('PaymentsRepository') paymentsRepository: IPaymentsRepository,
    @inject('UsersRepository') usersRepository: IUsersRepository,
  ) {
    this.paymentsRepository = paymentsRepository;
    this.usersRepository = usersRepository;
  }

  async execute({ id, userId }: IParams): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('O usuário não foi encontrado.');
    }

    const payment = await this.paymentsRepository.findById(id);

    if (!payment) {
      throw new AppError('O tipo de pagamento não foi encontrado.');
    }

    if (userId !== payment.userId) {
      throw new AppError('O usuário não tem permissão.');
    }
    await this.paymentsRepository.delete(id);
  }
}
