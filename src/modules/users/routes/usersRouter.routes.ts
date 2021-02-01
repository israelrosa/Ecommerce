import { Router } from 'express';

const userRouter = Router();

userRouter.post('/create');

userRouter.post('/session');

userRouter.get('/:id');
