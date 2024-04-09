import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Wish } from '#wish/entities/wish.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishListRepository: Repository<Wishlist>,
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) {}

  async create(createWishlistDto: CreateWishlistDto) {
    var { items } = createWishlistDto;

    var wishes = await this.wishRepository.findBy({ id: In(items) });

    var wishList = this.wishListRepository.create({ ...createWishlistDto, items: wishes });

    return this.wishListRepository.save(wishList);
  }

  findAll(page: number, pageSize: number) {
    return this.wishListRepository.findAndCount({
      take: pageSize,
      skip: pageSize * (page - 1),
      relations: ['owner', 'items'],
    });
  }

  async findById(id: string) {
    var wishlist = await this.wishListRepository.findOne({
      where: { id },
      relations: ['items'],
    });

    if (!wishlist) throw new NotFoundException(`Wishlist with '${id}' not found`);

    return wishlist;
  }

  async update(id: string, updateWishlistDto: UpdateWishlistDto) {
    var wishList = await this.findById(id);

    var { title, description, cover, items } = updateWishlistDto;

    var newWishes = items?.length && (await this.wishRepository.findBy({ id: In(items) }));

    return this.wishListRepository.save({
      ...wishList,
      title,
      description,
      cover,
      items: newWishes && [...newWishes],
    });
  }

  async remove(id: string) {
    var wishList = await this.findById(id);

    await this.wishListRepository.delete({ id });

    return wishList;
  }
}
