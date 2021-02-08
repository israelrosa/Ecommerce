import ICreateLocationDTO from '@modules/locations/interfaces/dtos/ICreateLocationDTO';
import ILocationsRepository from '@modules/locations/interfaces/ILocationsRepository';
import Location from '../../entities/Location';

export default class FakeLocationsRepository implements ILocationsRepository {
  private locations: Location[] = [];

  async create({
    city,
    complement,
    neighborhood,
    state,
    street,
    userId,
    zipCode,
  }: ICreateLocationDTO): Promise<Location> {
    const location = new Location();

    Object.assign(location, {
      city,
      complement,
      neighborhood,
      state,
      street,
      userId,
      zipCode,
    });

    this.locations.push(location);

    return location;
  }

  async delete(id: string): Promise<void> {
    const index = this.locations.findIndex(lc => lc.id === id);

    this.locations.splice(index, 1);
  }

  async findById(id: string): Promise<Location | undefined> {
    const data = this.locations.find(lc => lc.id === id);
    return data;
  }

  async findByUserId(userId: string): Promise<Location[]> {
    const data = this.locations.filter(lc => lc.userId === userId);
    return data;
  }

  async update(location: Location): Promise<Location> {
    const index = this.locations.findIndex(lc => lc.id === location.id);

    this.locations[index] = location;

    return this.locations[index];
  }
}
