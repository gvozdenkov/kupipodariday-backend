import { PickType } from '@nestjs/swagger';
import { User } from '#users/entities/user.entity';

export class FindUserByFilterDto extends PickType(User, ['username', 'email']) {}
