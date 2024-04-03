import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { FindUserByFilterDto } from './dto/find-user-by-filter.dto';
import { FindUserByUsernameDto } from './dto/find-user-by-username.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    var { email, username } = createUserDto;

    var isUsernameExists = await this.userRepository.findOneBy({ username });

    if (isUsernameExists)
      throw new ConflictException(`user with '${username}' username already exists`);

    var isEmailExists = await this.userRepository.findOneBy({ email });

    if (isEmailExists) throw new ConflictException(`user with ${email} email already exists`);

    var newUser = this.userRepository.create(createUserDto);

    return this.userRepository.save(newUser);
  }

  async findByFilter(findUserByFilterDto: FindUserByFilterDto) {
    var { email, username } = findUserByFilterDto;
    var user = await this.userRepository.findOne({ where: { email, username } });

    if (!user) throw new NotFoundException(`User not found`);

    return user;
  }

  async findByUsername(findUserByUsernameDto: FindUserByUsernameDto) {
    var { username } = findUserByUsernameDto;
    var user = await this.userRepository.findOneBy({ username });

    if (!user) throw new NotFoundException(`user with '${username}' username not found`);

    return user;
  }
}
