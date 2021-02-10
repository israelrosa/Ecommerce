import { adminOnly } from '@shared/middlewares/validateAuthentication';
import { Router } from 'express';
import OrderStatusController from '../controllers/OrderStatusController';

const orderStatusRouter = Router();

const orderStatusController = new OrderStatusController();

orderStatusRouter.post('/create', adminOnly, orderStatusController.create);

orderStatusRouter.delete(
  '/delete/:id',
  adminOnly,
  orderStatusController.delete,
);

orderStatusRouter.get('/', orderStatusController.showAll);

export default orderStatusRouter;
