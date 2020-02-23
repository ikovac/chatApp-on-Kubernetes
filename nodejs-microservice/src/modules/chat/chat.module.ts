import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from 'src/entities/conversation.entity';
import { Message } from 'src/entities/message.entity';
import { User } from 'src/entities/user.entity';

@Module({
  providers: [ChatService],
  controllers: [ChatController],
  imports: [TypeOrmModule.forFeature([Conversation, Message, User])],
  exports: [ChatService]
})
export class ChatModule { }
