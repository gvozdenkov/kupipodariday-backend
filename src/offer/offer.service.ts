import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { User } from '#users/entities/user.entity';
import { WishService } from '#wish/wish.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    private readonly wishService: WishService,
  ) {}

  async create(createOfferDto: CreateOfferDto, user: User) {
    var { wishId, amount, hidden } = createOfferDto;

    var isOwner = await this.wishService.isOwner(wishId, user.id);

    if (isOwner) throw new ForbiddenException("You can't create an offer for your wish");

    await this.wishService.updateRaised(wishId, amount);

    var updatedWish = await this.wishService.findOne({ where: { id: wishId } });

    return await this.offerRepository.save({
      user,
      wish: updatedWish,
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
