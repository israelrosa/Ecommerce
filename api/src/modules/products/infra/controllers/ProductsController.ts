import { Request, Response } from 'express';
import { container } from 'tsyringe';
import FindOneProductsService from '../services/FindOneProductService';
import ShowAllProductsService from '../services/ShowAllProductsService';

export default class ProductsController {
  async showAll(req: Request, res: Response): Promise<Response> {
    const showAll = container.resolve(ShowAllProductsService);

    const data = await showAll.execute();

    return res.json(data);
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const findOne = container.resolve(FindOneProductsService);

    const data = await findOne.execute(id);

    return res.json(data);
  }
}
