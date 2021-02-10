import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateOrderService from '../services/CreateOrderService';
import DeleteOrderService from '../services/DeleteOrderService';
import ShowAllOrdersSevice from '../services/ShowAllOrdersService';
import ShowAllUserOrdersService from '../services/ShowAllUserOrdersService';
import UpdateOrderService from '../services/UpdateOrderService';

export default class OrdersController {
  async create(req: Request, res: Response): Promise<Response> {
    const { locationId, paymentId } = req.body;

    const userId = req.user.id;

    const createOrder = container.resolve(CreateOrderService);

    const data = await createOrder.execute({ locationId, paymentId, userId });

    return res.json(data);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { admin } = req.user;
    const userId = req.user.id;
    const { id } = req.params;
    const deleteOrder = container.resolve(DeleteOrderService);
    await deleteOrder.execute(id, userId, admin);
    return res.json('O pedido foi deletado com sucesso!');
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const userId = req.user.id;
    const { locationId, paymentId } = req.body;
    const updateOrder = container.resolve(UpdateOrderService);

    const data = await updateOrder.execute({
      id,
      locationId,
      paymentId,
      userId,
    });

    return res.json(data);
  }

  async showAll(req: Request, res: Response): Promise<Response> {
    const adminId = req.user.id;
    const showAllOrders = container.resolve(ShowAllOrdersSevice);

    const data = await showAllOrders.execute(adminId);

    return res.json(data);
  }

  async showAllUserOrders(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const showAllOrders = container.resolve(ShowAllUserOrdersService);

    const data = await showAllOrders.execute(userId);

    return res.json(data);
  }
}
