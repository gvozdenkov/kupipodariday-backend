import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Wishlist
import { Wishlist } from '#wishlist/entities/wishlist.entity';
import { WishlistModule } from '#wishlist/wishlist.module';
import { WishlistService } from '#wishlist/wishlist.service';
import { WishlistController } from '#wishlist/wishlist.controller';
// Wish
import { Wish } from '#wish/entities/wish.entity';
import { WishModule } from '#wish/wish.module';
import { WishController } from '#wish/wish.controller';
import { WishService } from '#wish/wish.service';
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
  controllers: [AppController, UsersController, WishlistController, WishController],
  providers: [AppService, UsersService, WishlistService, WishService],
  imports: [
    AppConfigModule,
    DatabaseModule,
    TypeOrmModule.forFeature([User, Wishlist, Wish]),
    UsersModule,
    WishlistModule,
    WishModule,
  ],
})
export class AppModule {}
