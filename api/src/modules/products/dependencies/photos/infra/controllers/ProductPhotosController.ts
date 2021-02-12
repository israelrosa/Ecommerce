import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateProductPhotoService from '../services/CreateProductPhotoService';
import DeleteProductPhotoService from '../services/DeleteProductPhotoService';

export default class ProductPhotosController {
  async create(req: Request, res: Response): Promise<Response> {
    const adminId = req.user.id;
    const { name, productId } = req.body;
    const createPhoto = container.resolve(CreateProductPhotoService);

    const data = await createPhoto.execute({ adminId, name, productId });

    return res.json(data);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const adminId = req.user.id;
    const { id } = req.params;
    const deletePhoto = container.resolve(DeleteProductPhotoService);

    await deletePhoto.execute(id, adminId);

    return res.json('A foto foi deletada com sucesso!');
  }
}
