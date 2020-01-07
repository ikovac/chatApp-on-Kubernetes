import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  constructor(private socket: Socket) { }

  emitMsg() {
    this.socket.emit('msg', 'Hello friends');
  }

  onMsg() {
    return this.socket.fromEvent('report');
  }
}
