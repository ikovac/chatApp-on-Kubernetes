import { Component, OnInit } from '@angular/core';
import { SocketIoService } from '../../services/socket-io.service';

@Component({
  selector: 'app-chat-root',
  templateUrl: './chat-root.component.html',
  styleUrls: ['./chat-root.component.scss']
})
export class ChatRootComponent implements OnInit {

  constructor(private socketService: SocketIoService) { }

  ngOnInit() {
    this.socketService.onMsg().subscribe(msg => {
      console.log(msg);
    });
  }
}
