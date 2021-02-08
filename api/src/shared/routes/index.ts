import adminRouter from '@modules/admin/infra/routes/admin.routes';
import authAdminRouter from '@modules/admin/infra/routes/authAdmin.routes';
import authProductsRouter from '@modules/products/infra/routes/authProducts.routes';
import productsRouter from '@modules/products/infra/routes/products.routes';
import authUsersRouter from '@modules/users/infra/routes/authUsersRouter.routes';
import usersRouter from '@modules/users/infra/routes/usersRouter.routes';
import ensureAuthentication from '@shared/middlewares/ensureAuthentication';
import { Router } from 'express';

const router = Router();

router.all('/auth/*', ensureAuthentication);
router.use('/auth/users', authUsersRouter);
router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/auth/products', authProductsRouter);
router.use('/admin', adminRouter);
router.use('/auth/admin', authAdminRouter);

// router.use('/categories');
// router.use('/locations');
// router.use('/orders');
// router.use('/payments');
// router.use('/products');

export default router;
