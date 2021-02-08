import { getRepository, Repository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import ICreateUserDTO from '@modules/users/interfaces/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    firstname,
    lastname,
    email,
    password,
    contactNumber,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      firstname,
      lastname,
      email,
      password,
      contactNumber,
    });

    const result = await this.ormRepository.save(user);
    return result;
  }

  public async findById(userId: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(userId);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });
    return user;
  }

  public async findByContactNumber(
    contactNumber: string,
  ): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { contactNumber } });
    return user;
  }

  public async delete(userId: string): Promise<void> {
    const data = await this.ormRepository.delete(userId);

    if (!data.affected) {
      throw new AppError('Não foi possível deletar o usuário.');
    }
  }

  public async update(user: User): Promise<User> {
    const userUpdated = await this.ormRepository.save(user);

    return userUpdated;
  }
}

export default UsersRepository;
