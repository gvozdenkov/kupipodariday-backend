/* eslint-disable import/no-cycle */
import { Expose, Type } from 'class-transformer';
import type { Relation } from 'typeorm';
import { UserResponseDto } from '#users/dto/user-response.dto';
import { WishResponseDto } from '#wish/dto/wish-response.dto';

export class OfferResponseDto {
  @Expose()
  id: string;

  @Type(() => WishResponseDto)
  @Expose()
  item: Relation<WishResponseDto>;

  @Expose()
  amount: number;

  @Expose()
  hidden: boolean;

  @Type(() => UserResponseDto)
  @Expose()
  user: UserResponseDto;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
