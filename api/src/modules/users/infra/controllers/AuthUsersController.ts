import { Request, Response } from 'express';
import { container } from 'tsyringe';
import DeleteProfileService from '../services/DeleteProfileService';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

export default class AuthUsersController {
  async update(req: Request, res: Response): Promise<Response> {
    const updateProfile = container.resolve(UpdateProfileService);

    const {
      email,
      firstname,
      lastname,
      password,
      contactNumber,
      oldPassword,
    } = req.body;

    const { id } = req.user;

    const data = await updateProfile.execute({
      email,
      firstname,
      id,
      lastname,
      password,
      contactNumber,
      oldPassword,
    });

    return res.json(data);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const deleteProfile = container.resolve(DeleteProfileService);

    await deleteProfile.execute(id);

    return res.json('O usuário foi deletado.');
  }

  async showProfile(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const showProfile = container.resolve(ShowProfileService);

    const data = showProfile.execute(id);

    return res.json(data);
  }
}
