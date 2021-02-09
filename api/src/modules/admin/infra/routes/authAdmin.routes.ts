import { adminOnly } from '@shared/middlewares/validateAuthentication';
import { Router } from 'express';
import AuthAdminController from '../controllers/AuthAdminController';

const authAdminRouter = Router();

const authAdminController = new AuthAdminController();

authAdminRouter.use(adminOnly);
authAdminRouter.post('/create', authAdminController.create);
authAdminRouter.get('/show', authAdminController.show);
authAdminRouter.put('/update', authAdminController.update);
authAdminRouter.delete('/delete/:id', authAdminController.delete);

export default authAdminRouter;
