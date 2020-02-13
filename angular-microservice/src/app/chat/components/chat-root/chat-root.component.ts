import { Component, OnInit } from '@angular/core';
import { SocketIoService } from '../../services/socket-io.service';
import {conversationList, dummyConversation} from '../../dummydata';

@Component({
  selector: 'app-chat-root',
  templateUrl: './chat-root.component.html',
  styleUrls: ['./chat-root.component.scss']
})
export class ChatRootComponent implements OnInit {
  conversationList = conversationList; // dohvati se tako da se posalje request serveru.
  selectedConversation; // kada se klikne na neki razgovor ucitaj taj razgovor tako da posaljes request na server.

  constructor(private socketService: SocketIoService) { }

  ngOnInit() {
    /* this.socketService.onMsg().subscribe(msg => {
      console.log(msg);
    }); */
  }

  onConversationSelectEmit(somedata) {
    this.selectedConversation = dummyConversation;
  }
}
