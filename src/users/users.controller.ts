import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

var BASE_PATH = '/api';
var mainControllerPath = 'users';

@Controller(`${BASE_PATH}/v1`)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(mainControllerPath)
  findAll() {
    return this.usersService.findAll();
  }

  // @Get(`${mainControllerPath}:id`)
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(`${mainControllerPath}:id`)
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(`${mainControllerPath}:id`)
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
