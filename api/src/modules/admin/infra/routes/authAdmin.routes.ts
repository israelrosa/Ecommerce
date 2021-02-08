import { Router } from 'express';
import AuthAdminController from '../controllers/AuthAdminController';

const authAdminRouter = Router();

const authAdminController = new AuthAdminController();

authAdminRouter.post('/create', authAdminController.create);

authAdminRouter.get('/show', authAdminController.show);
authAdminRouter.put('/update', authAdminController.update);

authAdminRouter.delete('/delete/:id', authAdminController.delete);
