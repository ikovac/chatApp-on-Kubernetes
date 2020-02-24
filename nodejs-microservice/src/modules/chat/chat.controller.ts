import { Controller, Get, UseGuards, Param, Post, Body, Res, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChatService } from './chat.service';
import { IDbAllUserConversations } from 'src/interfaces/dbAllUserConversations.interface';
import { IConversationMessages } from 'src/interfaces/conversationMessages.interface';
import { Request, Response } from 'express';

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

    @Post('newconversation')
    async createNewConversation(@Body() body: { creatorId: number, receiverId: number }, @Req() req: Request, @Res() res: Response) {

        let conversationExists = await this.chatService.checkIfConversationExists(body);
        if (!conversationExists.length) {
            const createdConversation = await this.chatService.createNewConversation(body);
            conversationExists = { ...conversationExists, conversationId: createdConversation.id, is_group: 0 };
        }

        res.json(conversationExists);
    }


    @Post('newgroup')
    async createNewGroup(@Body() body: { groupMembers: number[], groupName: string }, @Req() req: Request, @Res() res: Response) {

        const createdGroup = await this.chatService.createNewGroup(body);

        res.json(createdGroup);
    }
}
