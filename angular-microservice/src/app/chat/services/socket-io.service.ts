import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { IConversationMessage } from 'src/app/shared/interfaces/iConversationMessage';
import { IConversationListElement } from 'src/app/shared/interfaces/iconversationlistelement';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  constructor(private socket: Socket) { }

  emitMsgOut(data: { newMessageOut: IConversationMessage, newSelectedConversation: IConversationListElement }) {
    const payload = {
      newMessageIn: { ...data.newMessageOut, message_class: 'message-in' },
      newConversationListElement: data.newSelectedConversation,
    };
    this.socket.emit('msg_out', payload);
  }

  onMsg() {
    return this.socket.fromEvent('msg_in');
  }

  onNewOnlineUserList() {
    return this.socket.fromEvent('online_users');
  }
}
