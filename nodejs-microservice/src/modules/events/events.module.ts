import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { AuthModule } from '../auth/auth.module';
import { ChatModule } from '../chat/chat.module';
import { RedisClientService } from 'src/redis-client.service';

@Module({
  imports: [AuthModule, ChatModule],
  providers: [EventsGateway, RedisClientService],
})
export class EventsModule {}
