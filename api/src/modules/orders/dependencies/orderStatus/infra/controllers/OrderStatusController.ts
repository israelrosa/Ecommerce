import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateOrderStatusService from '../services/CreateOrderStatusService';
import DeleteOrderStatusService from '../services/DeleteOrderStatusService';
import ShowAllOrderStatusService from '../services/ShowAllOrderStatusService';

export default class OrderStatusController {
  async create(req: Request, res: Response): Promise<Response> {
    const adminId = req.user.id;

    const { status } = req.body;

    const createOrderStatus = container.resolve(CreateOrderStatusService);

    const data = await createOrderStatus.execute(adminId, status);

    return res.json(data);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const adminId = req.user.id;

    const { id } = req.params;

    const deleteOrderStatus = container.resolve(DeleteOrderStatusService);

    await deleteOrderStatus.execute(id, adminId);

    return res.json('O status foi deletado com sucesso!');
  }

  async showAll(req: Request, res: Response): Promise<Response> {
    const showAllOrderStatus = container.resolve(ShowAllOrderStatusService);
    const data = await showAllOrderStatus.execute();

    return res.json(data);
  }
}
