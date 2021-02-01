import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column('varchar', { nullable: true, unique: true })
  avatar: string;

  @Column('varchar', { nullable: true, unique: true })
  contactNumber: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
