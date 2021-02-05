import ICreateAdminDTO from '@modules/admin/interfaces/dtos/ICreateAdminDTO';
import IAdminRepository from '@modules/admin/interfaces/IAdminRepository';
import { v4 as uuid } from 'uuid';
import Admin from '../../entity/Admin';

export default class FakeAdminRepository implements IAdminRepository {
  admins: Admin[] = [];

  async create({
    email,
    password,
    username,
    typeId,
  }: ICreateAdminDTO): Promise<Admin> {
    const admin = new Admin();

    Object.assign(admin, {
      id: uuid(),
      email,
      password,
      username,
      typeId,
    });

    this.admins.push(admin);

    return admin;
  }

  async delete(id: string): Promise<void> {
    const index = this.admins.findIndex(adm => adm.id === id);

    this.admins.splice(index, 1);
  }

  async findById(id: string): Promise<Admin | undefined> {
    const admin = this.admins.find(adm => adm.id === id);

    return admin;
  }

  async showAll(): Promise<Admin[]> {
    return this.admins;
  }

  async update(admin: Admin): Promise<Admin> {
    const index = this.admins.findIndex(adm => adm.id === admin.id);

    this.admins[index] = admin;

    return this.admins[index];
  }
}
