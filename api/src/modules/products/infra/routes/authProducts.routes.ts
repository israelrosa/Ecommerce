import { Router } from 'express';

const authProductsRouter = Router();

authProductsRouter.post('/create');
authProductsRouter.delete('/delete/:id');
authProductsRouter.put('/update/:id');

export default authProductsRouter;
