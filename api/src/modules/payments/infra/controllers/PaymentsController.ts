import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreatePaymentService from '../services/CreatePaymentService';
import DeletePaymentService from '../services/DeletePaymentService';
import ShowUserPaymentsService from '../services/ShowUserPaymentsService';
import UpdatePaymentService from '../services/UpdatePaymentService';

export default class PaymentsController {
  async create(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const { cardNumber, expirationDate, holder, securityCode } = req.body;
    const createPayment = container.resolve(CreatePaymentService);

    const data = await createPayment.execute({
      cardNumber,
      expirationDate,
      holder,
      securityCode,
      userId,
    });

    return res.json(data);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const userId = req.user.id;

    const deletePayment = container.resolve(DeletePaymentService);

    await deletePayment.execute({ id, userId });

    return res.json('O cartão foi deletado com sucesso!');
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const userId = req.user.id;

    const { cardNumber, expirationDate, holder, securityCode } = req.body;
    const updatePayment = container.resolve(UpdatePaymentService);

    const data = await updatePayment.execute({
      cardNumber,
      expirationDate,
      holder,
      id,
      securityCode,
      userId,
    });

    return res.json(data);
  }

  async showUserPayments(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const userPayments = container.resolve(ShowUserPaymentsService);

    const data = userPayments.execute(userId);

    return res.json(data);
  }
}
