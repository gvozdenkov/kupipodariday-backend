import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  user: string;

  @Column()
  @IsString()
  itemId: string;

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
