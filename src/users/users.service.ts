import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { FindUserByFilterDto } from './dto/find-user-by-filter.dto';
import { FindUserByUsernameDto } from './dto/find-user-by-username.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    var { email, username, password } = createUserDto;

    var user = await this.userRepository.findOneBy([{ username }, { email }]);

    if (user) {
      var isUserNameEsists = user.username === username;

      if (isUserNameEsists)
        throw new ConflictException(`user with '${username}' username already exists`);

      var isEmailExists = user.email === email;

      if (isEmailExists) throw new ConflictException(`user with '${email}' email already exists`);
    }

    var salt = await bcrypt.genSalt();
    var hashedPassword = await bcrypt.hash(password, salt);

    var newUser = this.userRepository.create({ ...createUserDto, password: hashedPassword });

    await this.userRepository.save(newUser);

    var newUserRes: ResponseUserDto = {
      username: newUser.username,
      about: newUser.about,
      avatar: newUser.avatar,
      email: newUser.email,
    };

    return newUserRes;
  }

  async update(updateUserDto: UpdateUserDto) {
    var { password } = updateUserDto;

    if (password) {
      var salt = await bcrypt.genSalt();
      var hashedPassword = await bcrypt.hash(password, salt);

      return this.userRepository.save({
        ...updateUserDto,
        password: hashedPassword,
      });
    }

    return this.userRepository.save({
      ...updateUserDto,
    });
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
