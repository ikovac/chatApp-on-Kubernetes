import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import * as cookie from 'cookie';
import { AuthService } from '../auth/auth.service';
import { Logger } from '@nestjs/common';
import { ChatService } from '../chat/chat.service';
import { IUser } from 'src/interfaces/user.interface';
import { RedisClientService } from 'src/redis-client.service';
import { Server } from 'socket.io';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  logger = new Logger('EventsGateway');

  constructor(
    private readonly redisClientService: RedisClientService,
    private readonly authService: AuthService,
    private readonly chatService: ChatService,
  ) { }

  async handleConnection(client) {
    this.logger.log('New connection');

    const user = await this.getUserFromToken(client);

    if (user) {
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


    // console.log("Client: ", Object.keys(client));
    // console.log("Conn socks: ", Object.keys(this.server.sockets.connected[client.id]));
    // console.log("Conn socks: ", Object.keys(this.server.clients().sockets));
    // console.log("Conn socks 2: ", Object.keys(this.server.sockets.sockets));
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

  @SubscribeMessage('newconversation')
  async handleNewConversation(client: any) {
    const sockets = Object.keys(this.server.sockets.sockets);

    const conversationsUsers = await this.chatService.getAllConversationsUsers();
    await this.redisClientService.setConversationsUsers(conversationsUsers);

    for (let i = 0; i < sockets.length; i++) {
      for (let j = 0; j < conversationsUsers.length; j++) {
        const socket = this.server.sockets.connected[sockets[i]];
        const user = await this.getUserFromToken(socket);
        if (user.id === conversationsUsers[j].userId) {
          socket.join(String(conversationsUsers[j].conversationId));
        }
      }
    }

  }

  async handleDisconnect(client) {
    this.logger.log('New Disconnection');

    const user = await this.getUserFromToken(client);

    if (user) {
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
  }

  async getUserFromToken(client): Promise<IUser> {
    const token = cookie.parse(client.handshake.headers.cookie).token;
    return await this.authService.unsign(token);
  }
}
