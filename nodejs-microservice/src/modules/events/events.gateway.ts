import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import * as cookie from 'cookie';
import { AuthService } from '../auth/auth.service';
import { Logger } from '@nestjs/common';
import { ChatService } from '../chat/chat.service';
import { IUser } from 'src/interfaces/user.interface';
import { RedisClientService } from 'src/redis-client.service';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server;

  logger = new Logger('EventsGateway');

  constructor(
    private readonly redisClientService: RedisClientService,
    private readonly authService: AuthService,
    private readonly chatService: ChatService,
  ) { }

  async handleConnection(client) {
    this.logger.log('New connection');

    const user = await this.getUserFromToken(client);

    // New Online User
    const onlineUsers = await this.redisClientService.getOnlineUsers(user);
    this.server.emit('online_users', onlineUsers);

    // Join New User to Chat Rooms
    let conversationsUsers = await this.redisClientService.getConversationsUsers();
    if (!conversationsUsers) {
      conversationsUsers = await this.chatService.getAllConversationsUsers();
      await this.redisClientService.setConversationsUsers(conversationsUsers);
    }
    conversationsUsers.map(row => {
      if (row.userId === user.id) {
        client.join(String(row.conversationId));
      }
    });
  }

  @SubscribeMessage('msg_out')
  async handleMessageOut(socket: any, payload: any) {
    // Emits to everyone except sender.
    // socket.broadcast.emit('msg_in', payload);

    // Emits to choosen chatRoom to everyone except sender.
    socket.broadcast.to(String(payload.newMessageIn.conversationId)).emit('msg_in', payload);

    // Save new message to the DB.
    await this.chatService.saveNewMessage(payload);
  }

  async handleDisconnect(client) {
    this.logger.log('New Disconnection');

    const user = await this.getUserFromToken(client);
    const onlineUsers = await this.redisClientService.removeUserOnline(user);

    client.broadcast.emit('online_users', onlineUsers);

    // Remove User from Chat Rooms
    const conversationsUsers = await this.redisClientService.getConversationsUsers();

    (conversationsUsers || []).map(row => {
      if (row.userId === user.id) {
        client.leave(String(row.conversationId));
      }
    });
  }

  async getUserFromToken(client): Promise<IUser> {
    const token = cookie.parse(client.handshake.headers.cookie).token;
    return await this.authService.unsign(token);
  }
}
