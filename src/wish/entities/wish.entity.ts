/* eslint-disable import/no-cycle */
import { IsNumber, IsString, IsUrl, Length } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Wishlist } from '#wishlist/entities/wishlist.entity';
import { User } from '#users/entities/user.entity';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 64 })
  @IsString()
  @Length(2, 250, { message: `'title' should have minium 2 and maximum 250 characters` })
  title: string;

  @Column('varchar', { length: 1024 })
  @IsString()
  @Length(2, 1024, { message: `'description' should have minium 2 and maximum 1024 characters` })
  description: string;

  @Column()
  @IsUrl({}, { message: `'link' should be a valid link` })
  link: string;

  @Column()
  @IsUrl({}, { message: `'image' should be a valid link` })
  image: string;

  @Column()
  @IsNumber({}, { message: `'price' should be a positive number` })
  price: number;

  @Column()
  @IsNumber({}, { message: `'raised' should be a positive number` })
  raised: number;

  @Column()
  @IsNumber({}, { message: `'copied' should be a positive number` })
  copied: number;

  @ManyToMany(() => Wishlist, (wishtlist) => wishtlist.id)
  wishlists: Wishlist[];

  @ManyToOne(() => User, (user) => user.id)
  owner: Relation<User>;

  @CreateDateColumn({ select: false })
  createdat: Date;

  @UpdateDateColumn({ select: false })
  updatedat: Date;
}
