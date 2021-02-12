import { Request, Response } from 'express';
import { container } from 'tsyringe';
import DeleteOrderProductService from '../services/DeleteOrderProductService';
import ShowAllOrderProductsService from '../services/ShowAllOrderProductsService';

export default class OrderProductsController {
  async showAllOrderProducts(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const userId = req.user.id;
    const isAdmin = req.user.admin;
    const showAll = container.resolve(ShowAllOrderProductsService);

    const data = showAll.execute(id, userId, isAdmin);

    return res.json(data);
  }

  async deleteOrderProducts(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const userId = req.user.id;
    const isAdmin = req.user.admin;
    const deleteOrderProduct = container.resolve(DeleteOrderProductService);
    const data = await deleteOrderProduct.execute(id, userId, isAdmin);

    return res.json(data);
  }
}
