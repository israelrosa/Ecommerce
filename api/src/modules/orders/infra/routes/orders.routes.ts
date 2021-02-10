import {
  adminOnly,
  userOnly,
} from '@shared/middlewares/validateAuthentication';
import { Router } from 'express';
import OrdersController from '../controllers/OrdersController';

const ordersRouter = Router();

const ordersController = new OrdersController();

ordersRouter.post('/create', ordersController.create);
ordersRouter.delete('/delete/:id', ordersController.delete);
ordersRouter.put('/update/:id', ordersController.update);
ordersRouter.get('/users/orders', userOnly, ordersController.create);
ordersRouter.get('/admin/orders', adminOnly, ordersController.create);

export default ordersRouter;
