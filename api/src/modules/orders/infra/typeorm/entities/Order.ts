import OrderProduct from '@modules/orders/dependencies/orderProducts/typeorm/entities/OrderProduct';
import OrderStatus from '@modules/orders/dependencies/orderStatus/typeorm/entities/OrderStatus';
import Payment from '@modules/payments/infra/typeorm/entities/Payment';
import User from '@modules/users/infra/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('orders')
export default class Order {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  paymentId: string;

  @Column()
  locationId: string;

  @Column()
  orderProductsId: string;

  @Column()
  orderStatusId: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => OrderProduct, op => op.order)
  orderProduct: OrderProduct[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Location)
  @JoinColumn({ name: 'locationId' })
  location: Location;

  @ManyToOne(() => Payment)
  @JoinColumn({ name: 'paymentId' })
  payment: Payment;

  @ManyToOne(() => OrderStatus)
  @JoinColumn({ name: 'orderStatusId' })
  orderStatus: OrderStatus;
}
