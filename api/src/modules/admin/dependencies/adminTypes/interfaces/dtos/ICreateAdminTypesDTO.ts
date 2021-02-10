export default interface ICreateAdminTypesDTO {
  type: string;

  createAdmins: boolean;

  deleteAdmins: boolean;

  updateAdmins: boolean;

  createProducts: boolean;

  deleteProducts: boolean;

  updateProducts: boolean;

  deleteLocations: boolean;

  updateLocations: boolean;

  deleteOrders: boolean;

  updateOrders: boolean;

  createOrderStatus: boolean;

  deleteOrderStatus: boolean;

  deleteUsers: boolean;

  updateUsers: boolean;
}
