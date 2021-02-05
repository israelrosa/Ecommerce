import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const usersController = new UsersController();

const usersRouter = Router();

usersRouter.post('/create', usersController.create);

usersRouter.post('/session', usersController.createSession);

export default usersRouter;
