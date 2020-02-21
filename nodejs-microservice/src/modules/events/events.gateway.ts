import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import * as cookie from 'cookie';
import { RedisClientService } from './redis-client.service';
import { AuthService } from '../auth/auth.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server;

  logger = new Logger('EventsGateway');

  constructor(
    private readonly redisClientService: RedisClientService,
    private readonly authService: AuthService,
  ) { }

  async handleConnection(client) {
    this.logger.log('New connection');

    const user = await this.getUserFromToken(client);
    const onlineUsers = await this.redisClientService.getOnlineUsers(user);

    this.server.emit('online_users', onlineUsers);
  }

  @SubscribeMessage('msg_out')
  handleMessageOut(socket: any, payload: any) {
    // this.server.emit('msg_in', payload);
    socket.broadcast.emit('msg_in', payload); // Emits to everyone except sender.
  }

  async handleDisconnect(client) {
    this.logger.log('New Disconnection');

    const user = await this.getUserFromToken(client);
    const onlineUsers = await this.redisClientService.removeUserOnline(user);

    client.broadcast.emit('online_users', onlineUsers);
  }

  async getUserFromToken(client) {
    const token = cookie.parse(client.handshake.headers.cookie).token;
    return await this.authService.unsign(token);
  }
}
