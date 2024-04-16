import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '#users/entities/user.entity';
import { Wish } from '#wish/entities/wish.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
  ) {}

  async create(createOfferDto: CreateOfferDto, user: User, wish: Wish) {
    var { amount, hidden } = createOfferDto;

    return await this.offerRepository.save({
      user,
      item: wish,
      amount,
      hidden,
    });
  }

  async findAll() {
    return await this.offerRepository.find({
      where: {
        hidden: false,
      },
      relations: {
        item: true,
        user: true,
      },
    });
  }

  async findById(id: string) {
    var offer = await this.offerRepository.findOne({
      where: { id },
      relations: {
        item: true,
        user: true,
      },
    });

    if (!offer) throw new NotFoundException(`Offer with '${id}' not found`);

    return offer;
  }
}
