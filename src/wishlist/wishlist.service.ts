import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Wish } from '#wish/entities/wish.entity';
import { User } from '#users/entities/user.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishListRepository: Repository<Wishlist>,
  ) {}

  async create(createWishlistDto: CreateWishlistDto, user: User, wishes?: Wish[]) {
    var cover =
      createWishlistDto.cover ||
      `https://placehold.jp/b0b0b0/ffffff/200x200.png?text=New%20Wishlist`;

    var name = createWishlistDto.name || 'New Wishlist';

    var newWishlist = this.wishListRepository.create({
      ...createWishlistDto,
      cover,
      name,
      owner: user,
      wishes: wishes || [],
    });

    return await this.wishListRepository.save(newWishlist);
  }

  async findOne(query: FindOneOptions<Wishlist>) {
    var wishlist = await this.wishListRepository.findOne(query);

    if (!wishlist) throw new NotFoundException(`Wishlist not found`);

    return wishlist;
  }

  async findMany(query: FindManyOptions<Wishlist>) {
    return (await this.wishListRepository.find(query)) || [];
  }

  async updateOne(id: string, updateWishlistDto: UpdateWishlistDto, wishes: Wish[]) {
    var wishlist = await this.findOne({
      where: { id },
      relations: ['wishes'],
    });

    var updatedWishlist = {
      ...wishlist,
      name: updateWishlistDto.name || wishlist.name,
      description: updateWishlistDto.description || wishlist.description,
      cover: updateWishlistDto.cover || wishlist.cover,
      wishes: wishes || wishlist.wishes,
    };

    return await this.wishListRepository.save(updatedWishlist);
  }

  async removeOne(id: string) {
    var wishlist = await this.findOne({
      where: { id },
      relations: ['owner', 'wishes'],
    });

    return await this.wishListRepository.remove(wishlist);
  }

  // helpers
  async isOwner(wishlistId: string, userId: string) {
    var wishlist = await this.findOne({
      where: { id: wishlistId },
      select: { id: true },
      relations: ['owner'],
    });

    return wishlist.owner.id === userId;
  }
}
