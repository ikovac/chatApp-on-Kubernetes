import { Injectable } from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from 'src/entities/conversation.entity';

@Injectable()
export class ChatService {

    constructor(
        @InjectRepository(Conversation) private readonly convRepo: Repository<Conversation>,
    ) {}

    async getAllConversationsForUser(userId: number) {
        return await getConnection().query(`
            SELECT distinct m.id,  m.message_text, m.timestamp,  m.conversationId, c.is_group,
            CASE WHEN c.is_group = 1 THEN c.group_name ELSE CONCAT(u.first_name,' ', u.last_name) END as conversation_name
            FROM message m
            LEFT JOIN conversation c ON m.conversationId = c.id
            LEFT JOIN conversation_users_user cu ON m.conversationId = cu.conversationId
            LEFT JOIN user u ON cu.userId = u.id
            WHERE m.id IN
                (SELECT MAX(id) FROM message WHERE conversationId IN
                    (SELECT conversationId FROM conversation_users_user WHERE userId = ?) GROUP BY conversationId)
            AND cu.userId != ? ORDER BY m.id DESC;`, [userId, userId]);
    }

    async getConversationMessages(userId: number, conversationId: number) {
        return await getConnection().query(`
            SELECT m.id, m.message_text, m.timestamp, m.userId, m.conversationId, c.is_group,
            CASE WHEN c.is_group = 1 THEN CONCAT(u.first_name, ' ', u.last_name) ELSE 0 END as sender,
            CASE WHEN m.userId = ? THEN 'message-out' ELSE 'message-in' END as message_class
            FROM message m
            LEFT JOIN user u ON m.userId = u.id
            LEFT JOIN conversation c ON m.conversationId = c.id
            WHERE m.conversationId = ?;`, [userId, conversationId]);
    }

    async getAllConversationsUsers() {
        return await getConnection().query(`SELECT * from conversation_users_user;`);
    }

    async checkIfConversationExists(participants) {
        const { creatorId, receiverId } = participants;

        return await getConnection().query(`
            SELECT cu.conversationId, c.is_group
            FROM conversation_users_user cu
            LEFT JOIN conversation c ON cu.conversationId = c.id
            WHERE cu.conversationId IN
                (SELECT conversationId from conversation_users_user WHERE userId = ?)
            AND cu.userId = ?
            AND is_group = 0;`, [creatorId, receiverId]);
    }

    async createNewConversation(participants) {
        const { creatorId, receiverId } = participants;

        const conversation = new Conversation();
        conversation.is_group = false;
        conversation.users = [creatorId, receiverId];

        return await this.convRepo.save(conversation);
    }
}
