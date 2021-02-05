import User from '@modules/users/infra/typeorm/entities/User';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('payments')
export default class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  holder: string;

  @Column()
  cardNumber: string;

  @Column()
  expirationDate: Date;

  @Column()
  securityCode: string;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
