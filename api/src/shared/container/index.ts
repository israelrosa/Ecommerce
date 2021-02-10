import AdminTypesRepository from '@modules/admin/dependencies/adminTypes/infra/typeorm/repositories/AdminTypesRepository';
import IAdminTypesRepository from '@modules/admin/dependencies/adminTypes/interfaces/IAdminTypesRepository';
import AdminRepository from '@modules/admin/infra/typeorm/repositories/AdminRepository';
import IAdminRepository from '@modules/admin/interfaces/IAdminRepository';
import LocationsRepository from '@modules/locations/infra/typeorm/repositories/LocationsRepository';
import ILocationsRepository from '@modules/locations/interfaces/ILocationsRepository';
import OrderStatusRepository from '@modules/orders/dependencies/orderStatus/infra/typeorm/repositories/OrderStatusRepository';
import IOrderStatusRepository from '@modules/orders/dependencies/orderStatus/interfaces/IOrderStatusRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
import IOrdersRepository from '@modules/orders/interfaces/IOrdersRepository';
import PaymentsRepository from '@modules/payments/infra/typeorm/repositories/PaymentsRepository';
import IPaymentsRepository from '@modules/payments/interfaces/IPaymentsRepository';
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

container.registerSingleton<ILocationsRepository>(
  'LocationsRepository',
  LocationsRepository,
);

container.registerSingleton<IPaymentsRepository>(
  'PaymentsRepository',
  PaymentsRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<IOrderStatusRepository>(
  'OrderStatusRepository',
  OrderStatusRepository,
);
