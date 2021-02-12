import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCategoryService from '../service/CreateCategoryService';
import DeleteCategoryService from '../service/DeleteCategoryService';
import UpdateCategoryService from '../service/UpdateCategoryService';

export default class CategoriesController {
  async create(req: Request, res: Response): Promise<Response> {
    const adminId = req.user.id;
    const { name, categoryId } = req.body;
    const createCategory = container.resolve(CreateCategoryService);
    const data = await createCategory.execute(name, adminId, categoryId);
    return res.json(data);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const adminId = req.user.id;
    const { categoryId } = req.body;
    const deleteCategory = container.resolve(DeleteCategoryService);
    await deleteCategory.execute(categoryId, adminId);
    return res.json('A categoria foi deletada com sucesso!');
  }

  async update(req: Request, res: Response): Promise<Response> {
    const adminId = req.user.id;

    const { id } = req.params;

    const { name, categoryId } = req.body;

    const updateCategory = container.resolve(UpdateCategoryService);

    const data = updateCategory.execute({ adminId, id, name, categoryId });

    return res.json(data);
  }
}
