import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import FakeUsersRepository from '../typeorm/repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUserService: AuthenticateUserService;
let createUserService: CreateUserService;
let user: User;

describe('AuthenticateUser', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    user = await createUserService.execute({
      firstname: 'John',
      lastname: 'Doe',
      contactNumber: '48998821344',
      email: 'johndoe@example.com',
      password: '12345678',
    });
  });

  it('should be able to authenticate with email', async () => {
    const response = await authenticateUserService.execute({
      email: 'johndoe@example.com',
      password: '12345678',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should be able to authenticate with contactNumber', async () => {
    const response = await authenticateUserService.execute({
      contactNumber: '48998821344',
      password: '12345678',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUserService.execute({
        password: '123678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with non existing user email', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'johndom@exemple.com',
        password: '123678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with non existing user contactNumber', async () => {
    await expect(
      authenticateUserService.execute({
        contactNumber: '423545642',
        password: '123678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'johndoe@example.com',
        password: '87654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
