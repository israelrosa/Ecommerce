import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orderStatus')
export default class OrderStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  status: string;
}
