import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
  ) {}

  create(createOfferDto: CreateOfferDto) {
    var newOffer = this.offerRepository.create(createOfferDto);

    return this.offerRepository.save(newOffer);
  }

  findAll(page: number, pageSize: number) {
    return this.offerRepository.findAndCount({
      take: pageSize,
      skip: pageSize * (page - 1),
    });
  }

  async findById(id: string) {
    var offer = await this.offerRepository.findOneBy({ id });

    if (!offer) throw new NotFoundException(`Offer with '${id}' not found`);

    return offer;
  }
}
