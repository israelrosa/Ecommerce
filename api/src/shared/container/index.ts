import AdminTypesRepository from '@modules/admin/dependencies/adminTypes/infra/typeorm/repositories/AdminTypesRepository';
import IAdminTypesRepository from '@modules/admin/dependencies/adminTypes/interfaces/IAdminTypesRepository';
import AdminRepository from '@modules/admin/infra/typeorm/repositories/AdminRepository';
import IAdminRepository from '@modules/admin/interfaces/IAdminRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import IProductsRepository from '@modules/products/interfaces/IProductsRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import { container } from 'tsyringe';
import '../providers';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IAdminRepository>(
  'AdminRepository',
  AdminRepository,
);

container.registerSingleton<IAdminTypesRepository>(
  'AdminTypesRepository',
  AdminTypesRepository,
);
