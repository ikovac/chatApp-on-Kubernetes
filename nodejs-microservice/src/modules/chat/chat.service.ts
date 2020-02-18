import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';

@Injectable()
export class ChatService {

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
            SELECT m.id, m.message_text, m.timestamp, m.userId, c.is_group,
            CASE WHEN c.is_group = 1 THEN CONCAT(u.first_name, ' ', u.last_name) ELSE 0 END as sender,
            CASE WHEN m.userId = ? THEN 'message-out' ELSE 'message-in' END as message_class
            FROM message m
            LEFT JOIN user u ON m.userId = u.id
            LEFT JOIN conversation c ON m.conversationId = c.id
            WHERE m.conversationId = ?;`, [userId, conversationId]);
    }
}
