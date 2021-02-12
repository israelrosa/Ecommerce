import { Router } from 'express';
import OrderProductsController from '../controllers/OrderProductsController';

const orderProductsRouter = Router();

const orderProductsController = new OrderProductsController();

orderProductsRouter.delete(
  '/delete/:id',
  orderProductsController.deleteOrderProducts,
);

orderProductsRouter.get(
  '/order/:id',
  orderProductsController.showAllOrderProducts,
);

export default orderProductsRouter;
