import AdminType from '@modules/admin/dependencies/adminTypes/typeorm/entities/AdminType';
import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('admin')
export default class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  adminTypeId: string;

  @ManyToOne(() => AdminType)
  @JoinColumn({ name: 'adminTypeId' })
  type: AdminType;
}
