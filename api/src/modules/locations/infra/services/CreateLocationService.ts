import ICreateLocationDTO from '@modules/locations/interfaces/dtos/ICreateLocationDTO';
import ILocationsRepository from '@modules/locations/interfaces/ILocationsRepository';
import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Location from '../typeorm/entities/Location';

@injectable()
export default class CreateLocationService {
  private locationsRepository: ILocationsRepository;

  private usersRepository: IUsersRepository;

  constructor(
    @inject('LocationsRepository') locationsRepository: ILocationsRepository,
    @inject('UsersRepository') usersRepository: IUsersRepository,
  ) {
    this.locationsRepository = locationsRepository;
    this.usersRepository = usersRepository;
  }

  async execute({
    city,
    complement,
    neighborhood,
    state,
    street,
    userId,
    zipCode,
  }: ICreateLocationDTO): Promise<Location> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('O usuário não existe.');
    }

    const data = await this.locationsRepository.create({
      city,
      complement,
      neighborhood,
      state,
      street,
      userId,
      zipCode,
    });

    return data;
  }
}
