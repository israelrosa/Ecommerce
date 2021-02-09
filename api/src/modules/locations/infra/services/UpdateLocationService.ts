import IAdminRepository from '@modules/admin/interfaces/IAdminRepository';
import ILocationsRepository from '@modules/locations/interfaces/ILocationsRepository';
import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Location from '../typeorm/entities/Location';

interface IParams {
  isAdmin: boolean;
  userId: string;
  id: string;
  city: string;
  complement: string;
  neighborhood: string;
  state: string;
  street: string;
  zipCode: string;
}

@injectable()
export default class UpdateLocationService {
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

  async execute({
    city,
    complement,
    neighborhood,
    state,
    street,
    zipCode,
    userId,
    id,
    isAdmin,
  }: IParams): Promise<Location> {
    const location = await this.locationsRepository.findById(id);

    if (!location) {
      throw new AppError('A localização não existe.');
    }

    if (isAdmin) {
      const admin = await this.adminRepository.findById(userId);

      if (admin) {
        if (!admin.type.updateLocations) {
          throw new AppError('O ADM não tem permissão.');
        }
        Object.assign(location, {
          city,
          complement,
          neighborhood,
          state,
          street,
          zipCode,
        });

        const result = await this.locationsRepository.update(location);

        return result;
      }
    }
    const user = await this.usersRepository.findById(userId);

    if (user) {
      if (user.id !== location.userId) {
        throw new AppError(
          'O usuário não tem permissão para atualizar uma localização que não o pertence.',
        );
      }

      Object.assign(location, {
        city,
        complement,
        neighborhood,
        state,
        street,
        zipCode,
      });

      const result = await this.locationsRepository.update(location);

      return result;
    }
    throw new AppError('Usuário inválido.');
  }
}
