import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('categories')
export default class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  categoryId: string;

  @ManyToOne(() => Category, ct => ct.categororyChildren)
  @JoinColumn({ name: 'categoryId' })
  categoryFather: Category;

  @OneToMany(() => Category, ct => ct.categoryFather)
  categororyChildren: Category[];
}
