import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAdminService from '../services/CreateAdminService';
import DeleteAdminService from '../services/DeleteAdminService';
import ShowAdminService from '../services/ShowAdminsService';
import UpdateAdminService from '../services/UpdateAdminService';

export default class AuthAdminController {
  async create(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { email, password, typeId, username } = req.body;
    const createAdmin = container.resolve(CreateAdminService);
    const data = await createAdmin.execute({
      adminId: id,
      email,
      password,
      typeId,
      username,
    });

    return res.json(classToClass(data));
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const showAdmin = container.resolve(ShowAdminService);

    const data = await showAdmin.execute(id);

    return res.json(classToClass(data));
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const adminId = req.user.id;
    const { id } = req.body;

    const deleteAdmin = container.resolve(DeleteAdminService);

    await deleteAdmin.execute({ adminId, id });

    return res.json('ADM deletado com sucesso!');
  }

  async update(req: Request, res: Response): Promise<Response> {
    const adminId = req.user.id;
    const { email, id, password, typeId, username } = req.body;
    const updateAdmin = container.resolve(UpdateAdminService);

    const data = await updateAdmin.execute({
      adminId,
      email,
      id,
      password,
      typeId,
      username,
    });

    return res.json(classToClass(data));
  }
}
