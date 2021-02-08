import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';

const productsController = new ProductsController();

const productsRouter = Router();

productsRouter.get('/', productsController.showAll);

productsRouter.get('/:id', productsController.findOne);

export default productsRouter;
