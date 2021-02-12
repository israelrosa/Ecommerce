import { Router } from 'express';
import ProductPhotosController from '../controllers/ProductPhotosController';

const productPhotosRouter = Router();

const productPhotosController = new ProductPhotosController();

productPhotosRouter.post('/create', productPhotosController.create);
productPhotosRouter.delete('/delete/:id', productPhotosController.delete);

export default productPhotosRouter;
