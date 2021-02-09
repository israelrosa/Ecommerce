import ICreatePaymentDTO from '@modules/payments/interfaces/dtos/ICreatePaymentDTO';
import IPaymentsRepository from '@modules/payments/interfaces/IPaymentsRepository';
import Payment from '../../entities/Payment';

export default class FakePaymentsRepository implements IPaymentsRepository {
  private payments: Payment[] = [];

  async create({
    cardNumber,
    expirationDate,
    holder,
    securityCode,
    userId,
  }: ICreatePaymentDTO): Promise<Payment> {
    const payment = new Payment();

    Object.assign(payment, {
      cardNumber,
      expirationDate,
      holder,
      securityCode,
      userId,
    });

    this.payments.push(payment);

    return payment;
  }

  async delete(id: string): Promise<void> {
    const index = this.payments.findIndex(py => py.id === id);

    this.payments.splice(index, 1);
  }

  async findById(id: string): Promise<Payment | undefined> {
    const data = this.payments.find(py => py.id === id);
    return data;
  }

  async findByUserId(userId: string): Promise<Payment[]> {
    const data = this.payments.filter(py => py.userId === userId);
    return data;
  }

  async update(payment: Payment): Promise<Payment> {
    const index = this.payments.findIndex(py => py.id === payment.id);

    this.payments[index] = payment;

    return this.payments[index];
  }
}
