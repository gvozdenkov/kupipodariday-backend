import { User } from '#users/entities/user.entity';
import { PickType } from '@nestjs/swagger';

export class ResponseUserDto extends PickType(User, ['username', 'about', 'avatar', 'email']) {}
