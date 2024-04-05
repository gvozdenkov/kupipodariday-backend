import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishListRepository: Repository<Wishlist>,
  ) {}

  create(createWishlistDto: CreateWishlistDto) {
    var wishList = this.wishListRepository.create(createWishlistDto);

    return this.wishListRepository.save(wishList);
  }

  findAll(page: number, pageSize: number) {
    return this.wishListRepository.findAndCount({
      take: pageSize,
      skip: pageSize * (page - 1),
    });
  }

  async findById(id: string) {
    var wishlist = await this.wishListRepository.findOneBy({ id });

    if (!wishlist) throw new NotFoundException(`Wishlist with '${id}' not found`);

    return wishlist;
  }

  async update(id: string, updateWishlistDto: UpdateWishlistDto) {
    var wishList = await this.findById(id);

    return this.wishListRepository.save({
      ...wishList,
      ...updateWishlistDto,
    });
  }

  async remove(id: string) {
    var wishList = await this.findById(id);

    if (!wishList) throw new NotFoundException(`Wishlist with '${id}' not found`);

    await this.wishListRepository.delete({ id });

    return wishList;
  }
}
