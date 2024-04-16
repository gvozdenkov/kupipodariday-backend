/* eslint-disable import/no-cycle */
import { Expose, Type } from 'class-transformer';
import { OfferResponseDto } from '#offer/dto/offer-response.dto';
import { UserResponseDto } from '#users/dto/user-response.dto';

export class WishResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  image: string;

  @Expose()
  link: string;

  @Expose()
  price: number;

  @Type(() => OfferResponseDto)
  @Expose()
  offers: OfferResponseDto[];

  @Type(() => UserResponseDto)
  @Expose()
  owner: UserResponseDto[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
