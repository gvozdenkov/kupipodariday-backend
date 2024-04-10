import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HelperService } from '#helper/helper.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { FindUserByFilterDto } from './dto/find-user-by-filter.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly helperService: HelperService,
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

    var hashedPassword = await this.helperService.hash(password);

    return await this.userRepository.save({ ...createUserDto, password: hashedPassword });
  }

  async update(updateUserDto: UpdateUserDto) {
    var { password } = updateUserDto;

    if (password) {
      var hashedPassword = await this.helperService.hash(password);

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

  async findByUsername(username: string) {
    var user = await this.userRepository.findOneBy({ username });

    if (!user) throw new NotFoundException(`user with '${username}' username not found`);

    return user;
  }

  async findByEmail(email: string) {
    var user = await this.userRepository.findOneBy({ email });

    if (!user) throw new NotFoundException(`user with '${email}' email not found`);

    return user;
  }
}
