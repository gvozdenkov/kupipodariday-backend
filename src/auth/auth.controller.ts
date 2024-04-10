import { Controller, Post, Body } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UsersService } from '#users/users.service';
import { CreateUserDto } from '#users/dto/create-user.dto';
import { UserResponseDto } from '#users/dto/user-response.dto';
import { AuthService } from './auth.service';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    var user = await this.usersService.create(createUserDto);

    return plainToInstance(UserResponseDto, user);
  }
}