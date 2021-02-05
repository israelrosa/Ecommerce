import Admin from '../infra/typeorm/entity/Admin';
import ICreateAdminDTO from './dtos/ICreateAdminDTO';

export default interface IAdminRepository {
  create(data: ICreateAdminDTO): Promise<Admin>;
  update(admin: Admin): Promise<Admin>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Admin | undefined>;
  showAll(): Promise<Admin[]>;
}
