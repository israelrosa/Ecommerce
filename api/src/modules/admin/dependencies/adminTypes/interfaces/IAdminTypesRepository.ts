import AdminType from '../infra/typeorm/entities/AdminType';
import ICreateAdminTypesDTO from './dtos/ICreateAdminTypesDTO';

export default interface IAdminTypesRepository {
  create(data: ICreateAdminTypesDTO): Promise<AdminType>;
  update(adminType: AdminType): Promise<AdminType>;
  delete(id: string): Promise<void>;
  findByTypeName(typeName: string): Promise<AdminType | undefined>;
  findById(id: string): Promise<AdminType | undefined>;
}
