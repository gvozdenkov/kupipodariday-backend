import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '#config';
import { User, UsersService, UsersController } from '#users';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

var config = configuration();
var { host, port, database, username, password } = config.db;

@Module({
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host,
      port,
      username,
      password,
      database,
      entities: [User],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([User]),
    UsersModule,
  ],
})
export class AppModule {}
