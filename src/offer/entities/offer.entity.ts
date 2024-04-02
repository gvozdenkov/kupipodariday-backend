import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsBoolean, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
