import { Column, PrimaryGeneratedColumn } from 'typeorm';

export default class OrderStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  status: string;
}
