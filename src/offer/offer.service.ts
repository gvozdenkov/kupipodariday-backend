import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
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
      wish,
      amount,
      hidden,
    });
  }

  async findMany(query: FindManyOptions<Offer>) {
    return (await this.offerRepository.find(query)) || [];
  }

  async findOne(query: FindOneOptions<Offer>) {
    var offer = await this.offerRepository.findOne(query);

    if (!offer) throw new NotFoundException(`Offer not found`);

    return offer;
  }
}
