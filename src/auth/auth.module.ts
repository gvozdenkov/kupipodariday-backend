import { Module } from '@nestjs/common';
import { UsersModule } from '#users/users.module';
import { HelperModule } from '#helper/helper.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule, HelperModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
