import { SubscribeMessage, WebSocketGateway, WsResponse, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import * as cookie from 'cookie';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  /* @WebSocketServer()
  server; */

  @SubscribeMessage('msg')
  handleMessage(client: any, payload: any): WsResponse<unknown> {
    const event = 'msg';
    const data = 'Hello world';
    return { event, data };
  }

  handleConnection(client) {
    console.log("New connection ");

    // client.emit('report', 'new client'); // Emit only to client
    // this.server.emit('report', 'new client'); // Emit broadcast to all online clients
  }

  handleDisconnect(client) {
    console.log("New Disconnection ");
  }

  /* @SubscribeMessage('connection')
  handleConnection(client: any, data: any) {
    console.log("New connection ", cookie.parse(client.handshake.headers.cookie).token);
  } */

  @SubscribeMessage('msg_out')
  handleMessageOut(socket: any, payload: any) {
    // this.server.emit('msg_in', payload);
    socket.broadcast.emit('msg_in', payload);
  }


}
