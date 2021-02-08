import AdminType from '../infra/typeorm/entities/AdminType';

export default interface IAdminTypesRepository {
  create(type: string, permission: boolean): Promise<AdminType>;
  update(adminType: AdminType): Promise<AdminType>;
  delete(id: string): Promise<void>;
  findByTypeName(typeName: string): Promise<AdminType | undefined>;
  findById(id: string): Promise<AdminType | undefined>;
}
