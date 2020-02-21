import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { RedisClientService } from './redis-client.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [EventsGateway, RedisClientService],
})
export class EventsModule {}
