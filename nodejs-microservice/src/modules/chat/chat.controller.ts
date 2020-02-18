import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChatService } from './chat.service';
import { IDbAllUserConversations } from 'src/interfaces/dbAllUserConversations.interface';
import { IConversationMessages } from 'src/interfaces/conversationMessages.interface';

@Controller('api/chat')
// @UseGuards(AuthGuard('jwt'))
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    @Get('getalluserconversations/:id')
    async getUserConversations(@Param() params): Promise<IDbAllUserConversations[]> {
        return await this.chatService.getAllConversationsForUser(params.id);
    }

    @Get('getconversationmessages/:userId/:conversationId')
    async getConversationMessages(@Param() params): Promise<IConversationMessages[]> {
        return await this.chatService.getConversationMessages(params.userId, params.conversationId);
    }
}
