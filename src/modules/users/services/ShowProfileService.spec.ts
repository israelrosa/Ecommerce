import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../typeorm/repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show profile of a user', async () => {
    const user = await fakeUsersRepository.create({
      firstname: 'John',
      lastname: 'Doe',
      contactNumber: '48998821344',
      email: 'johndoe@example.com',
      password: '12345678',
    });

    const userInfo = await showProfileService.execute(user.id);

    expect(userInfo).toMatchObject(user);
  });

  it('should not be able to show profile of a non-existing user', async () => {
    await expect(
      showProfileService.execute('non-existing'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
