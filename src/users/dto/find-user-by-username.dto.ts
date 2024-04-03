import { User } from '#users/entities/user.entity';
import { PickType } from '@nestjs/swagger';

export class FindUserByUsernameDto extends PickType(User, ['username']) {}
