import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../typeorm/repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      firstname: 'John',
      lastname: 'Doe',
      email: 'johndoe@example.com',
      password: '12345678',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not create a user with an email already taken', async () => {
    await createUserService.execute({
      firstname: 'John',
      lastname: 'Doe',
      contactNumber: '48998821344',
      email: 'johndoe@example.com',
      password: '12345678',
    });
    await expect(
      createUserService.execute({
        firstname: 'John',
        lastname: 'Doe',
        contactNumber: '48998821347',
        email: 'johndoe@example.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create a user with an contactNumber already taken', async () => {
    await createUserService.execute({
      firstname: 'John',
      lastname: 'Doe',
      contactNumber: '48998821344',
      email: 'johndoe@example.com',
      password: '12345678',
    });
    await expect(
      createUserService.execute({
        firstname: 'John',
        lastname: 'Doe',
        contactNumber: '48998821344',
        email: 'johndoe2@example.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
