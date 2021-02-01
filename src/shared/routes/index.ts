import { Router } from 'express';

const router = Router();

router.use('/users');

router.use('/products');
router.use('/categories');
router.use('/locations');
router.use('/orders');
router.use('/payments');
router.use('/products');

export default router;
