/* eslint-disable import/no-cycle */
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { User } from '#users/entities/user.entity';
import { Wish } from '#wish/entities/wish.entity';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Many Offers belong to unique user
  @ManyToOne(() => User, (user) => user.wishlists)
  user: Relation<User>;

  // Many Offers belong to unique Wish
  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Relation<Wish>;

  @Column({ type: 'real' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: `'amount' should be a positive number` })
  @Transform((param) => Math.round(param.value * 100) / 100)
  amount: number;

  @Column()
  @IsOptional()
  @IsBoolean({ message: `'hidden' should be a boolean value` })
  hidden: boolean = false;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}
