import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'nestjs-redis';
import { UserModule } from './modules/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { EventsModule } from './modules/events/events.module';
import { ChatModule } from './modules/chat/chat.module';

import config = require('./ormconfig');

const redisHost = process.env.NODEJS_REDIS_HOST || 'redis_microservice';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    RedisModule.register({host: redisHost}),
    UserModule,
    AuthModule,
    EventsModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
