import { Router } from 'express';
import AuthUsersController from '../controllers/AuthUsersController';

const authUsersController = new AuthUsersController();

const authUsersRouter = Router();

authUsersRouter.delete('/delete', authUsersController.delete);

authUsersRouter.put('/update', authUsersController.update);

authUsersRouter.get('/', authUsersController.showProfile);

export default authUsersRouter;
