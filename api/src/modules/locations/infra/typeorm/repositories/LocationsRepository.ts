import ICreateLocationDTO from '@modules/locations/interfaces/dtos/ICreateLocationDTO';
import ILocationsRepository from '@modules/locations/interfaces/ILocationsRepository';
import AppError from '@shared/errors/AppError';
import { getRepository, Repository } from 'typeorm';
import Location from '../entities/Location';

export default class LocationsRepository implements ILocationsRepository {
  private ormRepository: Repository<Location>;

  constructor() {
    this.ormRepository = getRepository(Location);
  }

  async create({
    city,
    complement,
    neighborhood,
    state,
    street,
    userId,
    zipCode,
  }: ICreateLocationDTO): Promise<Location> {
    const data = await this.ormRepository.create({
      city,
      complement,
      neighborhood,
      state,
      street,
      userId,
      zipCode,
    });

    const result = await this.ormRepository.save(data);

    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await this.ormRepository.delete(id);

    if (!result.affected) {
      throw new AppError('Não foi possível deletar a localização.');
    }
  }

  async findById(id: string): Promise<Location | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }

  async findByUserId(userId: string): Promise<Location[]> {
    const data = await this.ormRepository.find({ where: { userId } });

    return data;
  }

  async update(location: Location): Promise<Location> {
    const data = await this.ormRepository.save(location);

    return data;
  }
}
