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
  async findAll(@Query('page') page: number, @Query('size') pageSize: number) {
    var { 0: offers, 1: count } = await this.offerService.findAll(page, pageSize);
    var nextPage = count - pageSize * page > 0;
    var prevPage = page !== 1;
    var totalPages = Math.ceil(count / pageSize);

    return {
      data: offers,
      pagination: {
        total_records: count,
        current_page: page,
        total_pages: totalPages,
        next_page: nextPage,
        prev_page: prevPage,
      },
    };
  }

  @Get(':id')
  findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.offerService.findById(id);
  }
}
