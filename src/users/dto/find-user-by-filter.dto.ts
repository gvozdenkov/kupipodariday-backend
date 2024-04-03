import { User } from '#users/entities/user.entity';
import { PickType } from '@nestjs/swagger';

export class FindUserByFilterDto extends PickType(User, ['username', 'email']) {}
