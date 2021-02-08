import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateLocationService from '../services/CreateLocationService';
import DeleteLocationService from '../services/DeleteLocationService';
import ShowUserLocationsService from '../services/ShowUserLocationsService';
import UpdateLocationService from '../services/updateLocationService';

export default class LocationsController {
  async create(req: Request, res: Response): Promise<Response> {
    const { city, complement, neighborhood, state, street, zipCode } = req.body;

    const userId = req.user.id;

    const createLocation = container.resolve(CreateLocationService);

    const data = await createLocation.execute({
      city,
      complement,
      neighborhood,
      state,
      street,
      userId,
      zipCode,
    });

    return res.json(data);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;

    const { id } = req.params;
    const deleteLocation = container.resolve(DeleteLocationService);

    await deleteLocation.execute({ id, userId });

    return res.json('A localização foi deletada com sucesso!');
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const userId = req.user.id;

    const { city, complement, neighborhood, state, street, zipCode } = req.body;
    const updateLocation = container.resolve(UpdateLocationService);

    const data = await updateLocation.execute({
      city,
      complement,
      id,
      neighborhood,
      state,
      street,
      userId,
      zipCode,
    });

    return res.json(data);
  }

  async showUserLocations(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const userLocations = container.resolve(ShowUserLocationsService);

    const data = userLocations.execute(userId);

    return res.json(data);
  }
}
