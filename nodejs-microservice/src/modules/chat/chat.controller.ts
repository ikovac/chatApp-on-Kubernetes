import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChatService } from './chat.service';
import { dbAllUserConversations } from 'src/interfaces/dbAllUserConversations.interface';

@Controller('api/chat')
// @UseGuards(AuthGuard('jwt'))
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    @Get('getalluserconversations/:id')
    async getUserConversations(@Param() params): Promise<dbAllUserConversations[]> {
        return await this.chatService.getAllConversationsForUser(params.id);
    }
}
