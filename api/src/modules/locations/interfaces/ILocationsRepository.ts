import Location from '../infra/typeorm/entities/Location';
import ICreateLocationDTO from './dtos/ICreateLocationDTO';

export default interface ILocationsRepository {
  create(data: ICreateLocationDTO): Promise<Location>;
  findByUserId(userId: string): Promise<Location[]>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Location | undefined>;
  update(location: Location): Promise<Location>;
}
