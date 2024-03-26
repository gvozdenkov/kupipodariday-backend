import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Injectable()
export class WishlistService {
  create(createWishlistDto: CreateWishlistDto) {
    return `This action adds a new wishlist: ${createWishlistDto}`;
  }

  findAll() {
    return `This action returns all wishlist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wishlist`;
  }

  update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return `This action updates a #${id} wishlist: ${updateWishlistDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} wishlist`;
  }
}
