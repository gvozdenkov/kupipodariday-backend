/* eslint-disable import/no-cycle */
import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, IsUrl, Length, Matches } from 'class-validator';
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

  @Column('varchar', { length: 64, unique: true })
  @IsString()
  @Length(2, 64, { message: `'username' should have minium 2 and maximum 64 characters` })
  @Matches(/^[A-Za-z-]+$/, {
    message: `'username' must consist only of Latin characters and hyphens and without spaces`,
  })
  username: string;

  @Column('varchar', { length: 200 })
  @IsOptional()
  @IsString()
  @Length(0, 200, { message: `'about' should have maximum 200 characters` })
  about: string = "Haven't said anything about myself yet";

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

  @Column({ nullable: true })
  wishes: string;

  @Column({ nullable: true })
  wishlists: string;

  @Column({ nullable: true })
  offers: string;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}
