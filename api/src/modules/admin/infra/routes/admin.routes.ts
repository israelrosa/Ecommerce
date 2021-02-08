import { Router } from 'express';
import AdminController from '../controllers/AdminController';

const adminRouter = Router();

const adminController = new AdminController();

adminRouter.post('/session', adminController.createSession);

export default adminRouter;
