import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Wishlist
import { Wishlist } from '#wishlist/entities/wishlist.entity';
import { WishlistModule } from '#wishlist/wishlist.module';
import { WishlistService } from '#wishlist/wishlist.service';
import { WishlistController } from '#wishlist/wishlist.controller';
// User
import { User } from '#users/entities/user.entity';
import { UsersModule } from '#users/users.module';
import { UsersService } from '#users/users.service';
import { UsersController } from '#users/users.controller';
// App
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/config.module';

@Module({
  controllers: [AppController, UsersController, WishlistController],
  providers: [AppService, UsersService, WishlistService],
  imports: [
    AppConfigModule,
    DatabaseModule,
    TypeOrmModule.forFeature([User, Wishlist]),
    UsersModule,
    WishlistModule,
  ],
})
export class AppModule {}
