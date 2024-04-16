import { Expose } from 'class-transformer';

export class CreateWishResponseDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  link: string;

  @Expose()
  image: string;

  @Expose()
  price: number;
}
