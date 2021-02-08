import ICreateAdminDTO from '@modules/admin/interfaces/dtos/ICreateAdminDTO';
import IAdminRepository from '@modules/admin/interfaces/IAdminRepository';
import AppError from '@shared/errors/AppError';
import { getRepository, Repository } from 'typeorm';
import Admin from '../entity/Admin';

export default class AdminRepository implements IAdminRepository {
  ormRepository: Repository<Admin>;

  constructor() {
    this.ormRepository = getRepository(Admin);
  }

  async create({
    email,
    password,
    username,
    typeId,
  }: ICreateAdminDTO): Promise<Admin> {
    const data = await this.ormRepository.create({
      email,
      adminTypeId: typeId,
      password,
      username,
    });

    const result = await this.ormRepository.save(data);

    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await this.ormRepository.delete(id);

    if (!result.affected) {
      throw new AppError('Não foi possível deletar o administrador.');
    }
  }

  async findById(id: string): Promise<Admin | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  async findByEmail(email: string): Promise<Admin | undefined> {
    const result = await this.ormRepository.findOne({ where: { email } });

    return result;
  }

  async findByUsername(username: string): Promise<Admin | undefined> {
    const result = await this.ormRepository.findOne({ where: { username } });

    return result;
  }

  async showAll(): Promise<Admin[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  async update(admin: Admin): Promise<Admin> {
    const result = await this.ormRepository.save(admin);
    return result;
  }
}
