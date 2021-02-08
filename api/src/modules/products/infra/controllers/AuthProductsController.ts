import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateProductsService from '../services/CreateProductService';
import DeleteProductsService from '../services/DeleteProductsService';
import UpdateProductService from '../services/UpdateProductService';

export default class AuthProductsController {
  async create(req: Request, res: Response): Promise<Response> {
    const { categoryId, description, price, title, discount } = req.body;

    const adminId = req.user.id;

    const createProduct = container.resolve(CreateProductsService);

    const data = await createProduct.execute({
      adminId,
      categoryId,
      description,
      price,
      title,
      discount,
    });

    return res.json(data);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const adminId = req.user.id;

    const { id } = req.params;

    const deleteProduct = container.resolve(DeleteProductsService);

    await deleteProduct.execute(id, adminId);

    return res.json('Produto deletado com sucesso!');
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { categoryId, description, price, title, discount } = req.body;

    const adminId = req.user.id;

    const updateProduct = container.resolve(UpdateProductService);

    const data = await updateProduct.execute({
      adminId,
      categoryId,
      description,
      price,
      title,
      discount,
      productId: id,
    });

    return res.json(data);
  }
}
