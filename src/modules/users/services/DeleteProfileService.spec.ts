import FakeUsersRepository from '../typeorm/repositories/fakes/FakeUsersRepository';
import DeleteProfileService from './DeleteProfileService';

describe('DeleteProfile', () => {
  let fakeUsersRepository: FakeUsersRepository;

  let deleteProfileService: DeleteProfileService;

  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();

    deleteProfileService = new DeleteProfileService(fakeUsersRepository);
  });

  it('should be able to delete an user', async () => {
    const user = await fakeUsersRepository.create({
      firstname: 'John',
      lastname: 'Doe',
      contactNumber: '48998821344',
      email: 'johndoe@example.com',
      password: '12345678',
    });

    expect(await deleteProfileService.execute(user.id)).toBe(1);
  });
});
