import { Controller, Get, Post, Body, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/create-offer.dto';

@Controller({
  version: '1',
  path: 'offers',
})
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post()
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.offerService.create(createOfferDto);
  }

  @Get()
  async findAll(@Query('p') page: number, @Query('s') pageSize: number) {
    var { 0: offers, 1: count } = await this.offerService.findAll(page, pageSize);
    var next = count - pageSize * page > 0;
    var prev = page !== 1;
    var pages = Math.ceil(count / pageSize);
    return { offers, page, pages, next, prev };
  }

  @Get(':id')
  findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.offerService.findById(id);
  }
}
