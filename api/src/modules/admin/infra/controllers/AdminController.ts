import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAdminSessionService from '../services/CreateAdminSessionService';

export default class AdminController {
  async createSession(req: Request, res: Response): Promise<Response> {
    const { password, email, username } = req.body;
    const createSession = container.resolve(CreateAdminSessionService);

    const data = await createSession.execute({ password, email, username });

    return res.json(data);
  }
}
