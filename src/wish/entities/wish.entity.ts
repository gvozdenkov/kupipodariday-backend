/* eslint-disable import/no-cycle */
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Wishlist } from '#wishlist/entities/wishlist.entity';
import { User } from '#users/entities/user.entity';
import { Offer } from '#offer/entities/offer.entity';

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

  // Many Wishes belong to unique user
  @ManyToOne(() => User, (user) => user.wishlists)
  owner: Relation<User>;

  // Many Offers for one Wish
  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Relation<Offer[]>;

  // Wish located in many Wishlists, Each Wishlist contains many Wises
  @ManyToMany(() => Wishlist, (wishlist) => wishlist.items)
  wishlists: Relation<Wishlist[]>;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}
