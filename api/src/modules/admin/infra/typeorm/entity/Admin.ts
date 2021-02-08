import AdminType from '@modules/admin/dependencies/adminTypes/infra/typeorm/entities/AdminType';
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

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  adminTypeId: string;

  @ManyToOne(() => AdminType, { eager: true })
  @JoinColumn({ name: 'adminTypeId' })
  type: AdminType;
}
