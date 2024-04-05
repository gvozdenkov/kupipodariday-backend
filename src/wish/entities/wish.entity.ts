import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column({ type: 'real' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: `'price' should be a positive number` })
  @Transform((param) => Math.round(param.value * 100) / 100)
  price: number;

  @Column({ type: 'real' })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: `'raised' should be a positive number` })
  @Transform((param) => Math.round(param.value * 100) / 100)
  raised: number = 0;

  @Column()
  @IsOptional()
  @IsNumber({}, { message: `'copied' should be a positive number` })
  copied: number = 0;

  @Column({ nullable: true })
  owner: string;

  @Column('text', { array: true })
  offers: string[] = [];

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}
