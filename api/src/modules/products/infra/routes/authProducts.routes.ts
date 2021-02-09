import { adminOnly } from '@shared/middlewares/validateAuthentication';
import { Router } from 'express';

const authProductsRouter = Router();
authProductsRouter.use(adminOnly);
authProductsRouter.post('/create');
authProductsRouter.delete('/delete/:id');
authProductsRouter.put('/update/:id');

export default authProductsRouter;
