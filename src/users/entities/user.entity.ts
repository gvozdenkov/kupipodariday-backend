/* eslint-disable import/no-cycle */
import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 64 })
  @IsString()
  @Length(2, 64, { message: `'username' should have minium 2 and maximum 64 characters` })
  username: string;

  @Column('varchar', { length: 200, nullable: true })
  @IsOptional()
  @IsString()
  @Length(0, 200, { message: `'about' should have maximum 200 characters` })
  about: string;

  @Column()
  @IsOptional()
  @IsUrl({}, { message: `'avatar' should be a valid link to the image` })
  avatar: string = `https://i.pravatar.cc/200/?img=${Math.floor(Math.random() * 70) + 1}`;

  @Column({ unique: true })
  @IsEmail()
  @Transform((param) => param.value.toLowerCase())
  email: string;

  @Column('varchar', { length: 64, select: false })
  @Length(4, 64, { message: `'password' shoud be minimum 4 and maximum 64 charecters` })
  password: string;

  @CreateDateColumn({ select: false })
  createdat: Date;

  @UpdateDateColumn({ select: false })
  updatedat: Date;
}
