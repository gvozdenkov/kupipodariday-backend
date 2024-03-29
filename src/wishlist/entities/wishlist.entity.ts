/* eslint-disable import/no-cycle */
import { IsOptional, IsString, Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { User } from '#users/entities/user.entity';
import { Wish } from '#wish/entities/wish.entity';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 64 })
  @IsString()
  @Length(2, 250, { message: `'title' should have minium 2 and maximum 64 characters` })
  title: string;

  @Column()
  @IsOptional()
  @IsString()
  image: string;

  @ManyToOne(() => User, (user) => user.wishlists)
  owner: Relation<User>;

  @ManyToMany(() => Wish, (wish) => wish.id)
  @JoinTable()
  items: Wish[];

  @CreateDateColumn({ select: false })
  createdat: Date;

  @UpdateDateColumn({ select: false })
  updatedat: Date;
}
