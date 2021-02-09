import { userOnly } from '@shared/middlewares/validateAuthentication';
import { Router } from 'express';
import PaymentsController from '../controllers/PaymentsController';

const paymentsRouter = Router();

const paymentsController = new PaymentsController();

paymentsRouter.use(userOnly);
paymentsRouter.post('/create', paymentsController.create);
paymentsRouter.put('/update/:id', paymentsController.update);
paymentsRouter.get('/', paymentsController.showUserPayments);
paymentsRouter.delete('/:id', paymentsController.delete);

export default paymentsRouter;
