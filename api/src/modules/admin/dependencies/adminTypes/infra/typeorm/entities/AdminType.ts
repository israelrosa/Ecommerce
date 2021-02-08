import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('adminTypes')
export default class AdminType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  adminPermissions: boolean;
}
