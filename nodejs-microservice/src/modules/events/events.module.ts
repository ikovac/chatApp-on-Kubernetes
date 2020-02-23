import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { RedisClientService } from './redis-client.service';
import { AuthModule } from '../auth/auth.module';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [AuthModule, ChatModule],
  providers: [EventsGateway, RedisClientService],
})
export class EventsModule {}
