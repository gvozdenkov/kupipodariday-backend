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
import { User } from '#users/entities/user.entity';
import { Wish } from '#wish/entities/wish.entity';
import { IsBoolean, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  user: Relation<User>;

  @ManyToOne(() => Wish, (wish) => wish.id)
  item: Wish;

  @Column()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: `'amount' should be a positive number` })
  @Transform((amount) => Math.round(+amount * 100) / 100)
  amount: number;

  @Column()
  @IsBoolean({ message: `'hidden' should be a boolean value` })
  hidden: boolean = false;

  @CreateDateColumn({ select: false })
  createdat: Date;

  @UpdateDateColumn({ select: false })
  updatedat: Date;
}
