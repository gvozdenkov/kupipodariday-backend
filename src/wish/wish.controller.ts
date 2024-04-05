import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { WishService } from './wish.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

@Controller({
  version: '1',
  path: 'wishes',
})
export class WishController {
  constructor(private readonly wishService: WishService) {}

  @Post()
  create(@Body() createWishDto: CreateWishDto) {
    return this.wishService.create(createWishDto);
  }

  @Get('last')
  findLast() {
    return this.wishService.findLast();
  }

  @Get('top')
  findTop() {
    return this.wishService.findTop();
  }

  @Get(':id')
  findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.wishService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateWishDto: UpdateWishDto,
  ) {
    return this.wishService.update(id, updateWishDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.wishService.remove(id);
  }
}
