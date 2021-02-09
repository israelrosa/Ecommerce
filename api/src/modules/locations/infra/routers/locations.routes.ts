import { Router } from 'express';
import { userOnly } from '@shared/middlewares/validateAuthentication';
import LocationsController from '../controllers/LocationsController';

const locationsRouter = Router();

const locationsController = new LocationsController();

locationsRouter.post('/create', userOnly, locationsController.create);
locationsRouter.delete('/delete', locationsController.delete);
locationsRouter.put('/update', locationsController.update);
locationsRouter.get('/users/locations', locationsController.showUserLocations);

export default locationsRouter;
