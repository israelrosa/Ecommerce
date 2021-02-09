import IAdminRepository from '@modules/admin/interfaces/IAdminRepository';
import ILocationsRepository from '@modules/locations/interfaces/ILocationsRepository';
import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IParams {
  isAdmin: boolean;
  userId: string;
  id: string;
}

@injectable()
export default class DeleteLocationService {
  private locationsRepository: ILocationsRepository;

  private usersRepository: IUsersRepository;

  private adminRepository: IAdminRepository;

  constructor(
    @inject('LocationsRepository') locationsRepository: ILocationsRepository,
    @inject('UsersRepository') usersRepository: IUsersRepository,
    @inject('AdminRepository') adminRepository: IAdminRepository,
  ) {
    this.locationsRepository = locationsRepository;
    this.usersRepository = usersRepository;
    this.adminRepository = adminRepository;
  }

  async execute({ id, userId, isAdmin }: IParams): Promise<void> {
    if (isAdmin) {
      const admin = await this.adminRepository.findById(userId);

      if (admin) {
        if (admin.type.deleteLocations) {
          await this.locationsRepository.delete(id);
        } else {
          throw new AppError('O ADM não tem permissão.');
        }
      }
      throw new AppError('O ADM não existe.');
    }
    const user = await this.usersRepository.findById(userId);
    if (user) {
      await this.locationsRepository.delete(id);
    }
    throw new AppError('O usuário não existe.');
  }
}
