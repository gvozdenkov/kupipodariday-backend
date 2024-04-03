import { Wish } from '#wish/entities/wish.entity';
import { PickType } from '@nestjs/swagger';

export class CreateWishDto extends PickType(Wish, [
  'title',
  'description',
  'price',
  'image',
  'link',
]) {}
