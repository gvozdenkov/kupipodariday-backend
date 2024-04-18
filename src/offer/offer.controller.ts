import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { User } from '#users/entities/user.entity';
import { JwtAuthGuard } from '#auth/guard/jwt-auth.guard';
import { WishService } from '#wish/wish.service';
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { OfferResponseDto } from './dto/offer-response.dto';

@Controller({
  version: '1',
  path: 'offers',
})
export class OfferController {
  constructor(
    private readonly offerService: OfferService,
    private readonly wishService: WishService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createOfferDto: CreateOfferDto, @Req() req: Request & { user: User }) {
    var { wishId, amount } = createOfferDto;

    var isOwner = await this.wishService.isOwner(wishId, req.user.id);

    if (isOwner) throw new ForbiddenException("You can't create an offer for your wish");

    this.wishService.updateRaised(wishId, amount);

    var updatedWish = await this.wishService.findOne({ where: { id: wishId } });

    await this.offerService.create(createOfferDto, req.user, updatedWish);

    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    var offers = await this.offerService.findMany({
      where: { hidden: false },
      relations: ['wish', 'user'],
    });

    return plainToInstance(OfferResponseDto, offers);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    var offer = await this.offerService.findOne({
      where: { id },
      relations: ['wish', 'user'],
    });

    return plainToInstance(OfferResponseDto, offer);
  }
}
