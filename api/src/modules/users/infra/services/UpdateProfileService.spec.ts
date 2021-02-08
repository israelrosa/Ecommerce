import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@shared/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../typeorm/repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update profile', async () => {
    const user = await fakeUsersRepository.create({
      firstname: 'John',
      lastname: 'Doe',
      contactNumber: '48998821344',
      email: 'johndoe@example.com',
      password: '12345678',
    });

    const updatedUser = await updateProfileService.execute({
      id: user.id,
      contactNumber: '4155653512',
      email: 'fulaninho@example.com',
      firstname: 'John',
      lastname: 'Doe',
      password: '12345678',
    });

    expect(updatedUser).toMatchObject({
      id: user.id,
      contactNumber: '4155653512',
      email: 'fulaninho@example.com',
      firstname: 'John',
      lastname: 'Doe',
      password: '12345678',
    });
  });

  it('should not be able to update a non-existing user', async () => {
    await expect(
      updateProfileService.execute({
        id: 'talcoisa',
        contactNumber: '991283833',
        firstname: 'fulano',
        lastname: 'de tal',
        password: '23432fdsa',
        email: 'fulaninho@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    const user = await fakeUsersRepository.create({
      firstname: 'John',
      lastname: 'Doe',
      contactNumber: '48998821344',
      email: 'johndoe@example.com',
      password: '12345678',
    });

    await fakeUsersRepository.create({
      firstname: 'John',
      lastname: 'Doe',
      contactNumber: '48998821334',
      email: 'cicrano@example.com',
      password: '12345678',
    });

    await expect(
      updateProfileService.execute({
        id: user.id,
        email: 'cicrano@example.com',
        firstname: 'John',
        lastname: 'Doe',
        contactNumber: '48998821334',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user contactNumber', async () => {
    const user = await fakeUsersRepository.create({
      firstname: 'John',
      lastname: 'Doe',
      contactNumber: '48998821344',
      email: 'johndoe@example.com',
      password: '12345678',
    });

    await fakeUsersRepository.create({
      firstname: 'John',
      lastname: 'Doe',
      contactNumber: '48998821334',
      email: 'cicrano@example.com',
      password: '12345678',
    });

    await expect(
      updateProfileService.execute({
        id: user.id,
        contactNumber: '48998821334',
        email: 'johndoe@example.com',
        password: '12345678',
        firstname: 'John',
        lastname: 'Doe',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      firstname: 'John',
      lastname: 'Doe',
      contactNumber: '48998821344',
      email: 'johndoe@example.com',
      password: '123123',
    });

    const updatedUser = await updateProfileService.execute({
      id: user.id,
      firstname: 'John',
      lastname: 'Doe',
      email: 'fulano@example.com',
      oldPassword: '123123',
      password: '321321',
    });

    expect(updatedUser?.password).toBe('321321');
  });

  it('should not be able to update the password if the old password is wrong', async () => {
    const user = await fakeUsersRepository.create({
      firstname: 'John',
      lastname: 'Doe',
      contactNumber: '48998821344',
      email: 'johndoe@example.com',
      password: '12345678',
    });

    await expect(
      updateProfileService.execute({
        id: user.id,
        firstname: 'John',
        lastname: 'Doe',
        email: 'fulano@example.com',
        oldPassword: '111111',
        password: '321321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
