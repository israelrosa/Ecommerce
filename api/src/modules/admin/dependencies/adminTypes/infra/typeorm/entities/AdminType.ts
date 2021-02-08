import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('adminTypes')
export default class AdminType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  createAdmins: boolean;

  @Column()
  deleteAdmins: boolean;

  @Column()
  updateAdmins: boolean;

  @Column()
  createProducts: boolean;

  @Column()
  deleteProducts: boolean;

  @Column()
  updateProducts: boolean;

  @Column()
  deleteLocations: boolean;

  @Column()
  updateLocations: boolean;

  @Column()
  deleteOrders: boolean;

  @Column()
  updateOrders: boolean;

  @Column()
  deleteUsers: boolean;

  @Column()
  updateUsers: boolean;
}
