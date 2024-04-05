import { IsOptional, IsString, IsUrl, Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 64 })
  @IsString()
  @Length(2, 250, { message: `'title' should have minium 2 and maximum 64 characters` })
  title: string = 'New Wishlist';

  @Column('varchar', { length: 1500, nullable: true })
  @IsString()
  @IsOptional()
  @Length(2, 1500, { message: `'description' should have minium 2 and maximum 1500 characters` })
  description: string;

  @Column()
  @IsOptional()
  @IsUrl({}, { message: `'cover' should be a valid link to the wishlist cover` })
  cover: string = `https://placehold.jp/b0b0b0/ffffff/200x200.png?text=New%20Wishlist`;

  @Column({ nullable: true })
  owner: string;

  @Column('text', { array: true })
  @IsOptional()
  itemIds: string[] = [];

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}
