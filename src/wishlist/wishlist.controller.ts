import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { In } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '#auth/guard/jwt-auth.guard';
import { User } from '#users/entities/user.entity';
import { WishService } from '#wish/wish.service';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { WishlistResponseDto } from './dto/wishlist-response.dto';

@Controller({
  version: '1',
  path: 'wishlists',
})
export class WishlistController {
  constructor(
    private readonly wishlistService: WishlistService,
    private readonly wishService: WishService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createWishlistDto: CreateWishlistDto, @Req() req: Request & { user: User }) {
    var { items } = createWishlistDto;

    var wishes =
      items &&
      (await this.wishService.findMany({
        where: { id: In(items) },
      }));

    var wishlist = await this.wishlistService.create(createWishlistDto, req.user, wishes);

    return plainToInstance(WishlistResponseDto, wishlist);
  }

  @Get()
  async findAll() {
    var wishlists = await this.wishlistService.findMany({
      relations: ['owner', 'items'],
    });

    return plainToInstance(WishlistResponseDto, wishlists);
  }

  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    var wishlist = await this.wishlistService.findOne({
      where: { id },
      relations: ['owner', 'items'],
    });

    return plainToInstance(WishlistResponseDto, wishlist);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
    @Req() req: Request & { user: User },
  ) {
    var isOwner = await this.wishlistService.isOwner(id, req.user.id);

    if (!isOwner) throw new ForbiddenException("You can't edit other people's wishlists");

    var { items } = updateWishlistDto;

    var wishes =
      items &&
      (await this.wishService.findMany({
        where: { id: In(items) },
      }));

    await this.wishlistService.updateOne(id, updateWishlistDto, wishes);

    var updatedWishlist = await this.wishlistService.findOne({
      where: { id },
      relations: ['owner', 'items'],
    });

    return plainToInstance(WishlistResponseDto, updatedWishlist);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Req() req: Request & { user: User },
  ) {
    var isOwner = await this.wishlistService.isOwner(id, req.user.id);

    if (!isOwner) throw new ForbiddenException("You can't delete other people's wishlists");

    var removedWishlist = await this.wishlistService.removeOne(id);

    return plainToInstance(WishlistResponseDto, removedWishlist);
  }
}
