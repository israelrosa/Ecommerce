import ICreateUserDTO from '@modules/users/interfaces/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import { v4 as uuid } from 'uuid';
import User from '../../entities/User';

export default class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create({
    firstname,
    lastname,
    email,
    password,
    contactNumber,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuid(),
      locations: [],
      firstname,
      lastname,
      email,
      password,
      contactNumber,
    });

    this.users.push(user);

    return user;
  }

  public async findById(userId: string): Promise<User | undefined> {
    const user = this.users.find(userStored => userStored.id === userId);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(userStored => userStored.email === email);

    return user;
  }

  public async findByContactNumber(
    contactNumber: string,
  ): Promise<User | undefined> {
    const user = this.users.find(
      userStored => userStored.contactNumber === contactNumber,
    );

    return user;
  }

  public async delete(userId: string): Promise<number> {
    const userIndex = this.users.findIndex(findUser => findUser.id === userId);

    const user = this.users.splice(userIndex, 1);

    return user.length;
  }

  public async update(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}
