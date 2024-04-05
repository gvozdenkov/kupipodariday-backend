import { Wishlist } from '#wishlist/entities/wishlist.entity';
import { PickType } from '@nestjs/swagger';

export class CreateWishlistDto extends PickType(Wishlist, [
  'title',
  'description',
  'cover',
  'itemIds',
]) {}
