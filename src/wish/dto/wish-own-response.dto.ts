import { OfferResponseDto } from '#offer/dto/offer-response.dto';
import { Wish } from '#wish/entities/wish.entity';
import { PickType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class WishOwnResponseDto extends PickType(Wish, [
  'id',
  'title',
  'description',
  'image',
  'link',
  'price',
  'createdAt',
  'updatedAt',
]) {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  image: string;

  @Expose()
  link: string;

  @Expose()
  price: number;

  @Expose()
  raised: number;

  @Expose()
  copied: number;

  @Type(() => OfferResponseDto)
  @Expose()
  offers: OfferResponseDto[];

  @Expose()
  createdAt;

  @Expose()
  updatedAt;
}
