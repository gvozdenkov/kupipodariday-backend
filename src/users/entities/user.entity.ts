import { Transform } from 'class-transformer';
/* eslint-disable import/no-cycle */
import { IsEmail, IsOptional, IsString, IsUrl, Length, Matches, Min } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import type { Relation } from 'typeorm';
import bcrypt from 'bcrypt';
import { Wishlist } from '#wishlist/entities/wishlist.entity';
import { Wish } from '#wish/entities/wish.entity';
import { Offer } from '#offer/entities/offer.entity';

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
  @Min(4, { message: `'password' shoud be minimum 4 charecters` })
  password: string;

  // Many Wishes belong to unique user
  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Relation<Wish[]>;

  // Many Wishlists belong to unique user
  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Relation<Wishlist[]>;

  // Many Offers belong to unique user
  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Relation<Offer[]>;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    var salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
