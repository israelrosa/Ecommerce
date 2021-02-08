import ILocationsRepository from '@modules/locations/interfaces/ILocationsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Location from '../typeorm/entities/Location';

@injectable()
export default class ShowUserLocationsService {
  private locationsRepository: ILocationsRepository;

  constructor(
    @inject('LocationsRepository') locationsRepository: ILocationsRepository,
  ) {
    this.locationsRepository = locationsRepository;
  }

  async execute(userId: string): Promise<Location[]> {
    const locations = await this.locationsRepository.findByUserId(userId);

    if (locations.length === 0) {
      throw new AppError('O usuário não tem localizações salvas.');
    }

    return locations;
  }
}
