import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';

@Injectable()
export class WishService {
  private last: number;

  private top: number;

  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
  ) {
    this.last = 40;
    this.top = 20;
  }

  create(createWishDto: CreateWishDto) {
    var newWish = this.wishRepository.create(createWishDto);

    return this.wishRepository.save(newWish);
  }

  findLast() {
    return this.wishRepository.find({
      order: { createdAt: 'DESC' },
      take: this.last,
    });
  }

  findTop() {
    return this.wishRepository.find({
      order: { copied: 'DESC' },
      take: this.top,
    });
  }

  async findById(id: string) {
    var wish = await this.wishRepository.findOneBy({ id });

    if (!wish) throw new NotFoundException(`Wish with '${id}' not found`);

    return wish;
  }

  async update(id: string, updateWishDto: UpdateWishDto) {
    var wish = await this.findById(id);

    return this.wishRepository.save({
      ...wish,
      ...updateWishDto,
    });
  }

  async remove(id: string) {
    var wish = await this.findById(id);

    if (!wish) throw new NotFoundException(`Wish with '${id}' not found`);

    await this.wishRepository.delete({ id });

    return wish;
  }
}
