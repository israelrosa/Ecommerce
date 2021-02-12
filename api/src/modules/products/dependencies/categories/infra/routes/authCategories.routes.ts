import { Router } from 'express';
import CategoriesController from '../controllers/CategoriesController';

const authCategoriesRouter = Router();

const categoriesController = new CategoriesController();

authCategoriesRouter.post('/create', categoriesController.create);
authCategoriesRouter.delete('/delete', categoriesController.delete);
authCategoriesRouter.put('/update', categoriesController.update);

export default authCategoriesRouter;
