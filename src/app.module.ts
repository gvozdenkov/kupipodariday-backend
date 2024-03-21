import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UsersService, UsersController } from '#users';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/config.module';

@Module({
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
  imports: [AppConfigModule, DatabaseModule, TypeOrmModule.forFeature([User]), UsersModule],
})
export class AppModule {}
