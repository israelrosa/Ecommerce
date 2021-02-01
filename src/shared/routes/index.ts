import authUsersRouter from '@modules/users/routes/authUsersRouter.routes';
import usersRouter from '@modules/users/routes/usersRouter.routes';
import ensureAuthentication from '@shared/middlewares/ensureAuthentication';
import { Router } from 'express';

const router = Router();

router.all('/auth/*', ensureAuthentication);

router.use('/auth/users', authUsersRouter);
router.use('/users', usersRouter);

router.use('/products');
router.use('/categories');
router.use('/locations');
router.use('/orders');
router.use('/payments');
router.use('/products');

export default router;
