import { Expose, Type } from 'class-transformer';
import { UserPublicProfileResponseDto } from '#users/dto/user-public-profile-response.dto';
import { WishOwnResponseDto } from '#wish/dto/wish-own-response.dto';

export class WishlistResponseDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  cover: string;

  @Type(() => UserPublicProfileResponseDto)
  @Expose()
  owner: UserPublicProfileResponseDto;

  @Type(() => WishOwnResponseDto)
  @Expose()
  items: WishOwnResponseDto[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
