import { Controller, Get, Body, Param, Query, Req, UseGuards, Patch } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '#auth/guard/jwt-auth.guard';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller({
  version: '1',
  path: 'users',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findByFilter(@Query('email') email?: string, @Query('username') username?: string) {
    return this.usersService.findByFilter({ email, username });
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  findMe(@Req() req: { user: User }) {
    return plainToInstance(UserResponseDto, req.user);
  }

  @Get(':username')
  findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async update(@Body() updateUserDto: UpdateUserDto, @Req() req: { user: User }) {
    var user = await this.usersService.update(req.user.id, updateUserDto);

    return plainToInstance(UserResponseDto, user);
  }
}
