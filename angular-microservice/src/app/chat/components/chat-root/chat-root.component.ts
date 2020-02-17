import { Component, OnInit } from '@angular/core';
import { SocketIoService } from '../../services/socket-io.service';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';
import { IConversationListElement } from 'src/app/shared/interfaces/iconversationlistelement';

@Component({
  selector: 'app-chat-root',
  templateUrl: './chat-root.component.html',
  styleUrls: ['./chat-root.component.scss']
})
export class ChatRootComponent implements OnInit {
  conversationList$: Observable<IConversationListElement[]>; // dohvati se tako da se posalje request serveru.
  selectedConversation; // kada se klikne na neki razgovor ucitaj taj razgovor tako da posaljes request na server.

  constructor(
    private socketService: SocketIoService,
    private chatService: ChatService
    ) { }

  ngOnInit() {
    /* this.socketService.onMsg().subscribe(msg => {
      console.log(msg);
    }); */

    this.conversationList$ = this.chatService.getAllUserConversations();
  }

  onConversationSelectEmit(selectedConversation) {
    this.selectedConversation = selectedConversation;
  }
}
