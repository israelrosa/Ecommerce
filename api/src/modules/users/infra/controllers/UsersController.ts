import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '../services/AuthenticateUserService';
import CreateUserService from '../services/CreateUserService';

export default class UsersController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email, firstname, lastname, password, contactNumber } = req.body;
    const createUser = container.resolve(CreateUserService);

    const data = await createUser.execute({
      email,
      firstname,
      lastname,
      password,
      contactNumber,
    });

    return res.json(data);
  }

  async createSession(req: Request, res: Response): Promise<Response> {
    const { password, contactNumber, email } = req.body;
    const createSession = container.resolve(AuthenticateUserService);

    const data = await createSession.execute({
      password,
      contactNumber,
      email,
    });

    return res.json(classToClass(data));
  }
}
