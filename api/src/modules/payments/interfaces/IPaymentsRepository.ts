import Payment from '../infra/typeorm/entities/Payment';
import ICreatePaymentDTO from './dtos/ICreatePaymentDTO';

export default interface IPaymentsRepository {
  create(data: ICreatePaymentDTO): Promise<Payment>;
  update(payment: Payment): Promise<Payment>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Payment | undefined>;
  findByUserId(userId: string): Promise<Payment[]>;
}
