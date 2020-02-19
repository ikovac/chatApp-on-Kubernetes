import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketIoService } from '../../services/socket-io.service';
import { ChatService } from '../../services/chat.service';
import { Observable, Subscription } from 'rxjs';
import { IConversationListElement } from 'src/app/shared/interfaces/iconversationlistelement';
import { Store, select } from '@ngrx/store';
import { selectConversationList, selectSelectedConversation } from 'src/app/ngrx/selectors/chat-app.selectors';
import { IAppState } from 'src/app/ngrx/reducers/chat-app.reducers';
import { setInitialConversationList } from 'src/app/ngrx/actions/chat-app.actions';

@Component({
  selector: 'app-chat-root',
  templateUrl: './chat-root.component.html',
  styleUrls: ['./chat-root.component.scss']
})
export class ChatRootComponent implements OnInit, OnDestroy {
  conversationList$: Observable<IConversationListElement[]>; // dohvati se tako da se posalje request serveru.
  selectedConversation$; // kada se klikne na neki razgovor ucitaj taj razgovor tako da posaljes request na server.
  subscription: Subscription;

  constructor(
    private socketService: SocketIoService,
    private chatService: ChatService,
    private store: Store<IAppState>
  ) { }

  ngOnInit() {
    /* this.socketService.onMsg().subscribe(msg => {
      console.log(msg);
    }); */
    this.conversationList$ = this.store.pipe(select(selectConversationList));
    this.selectedConversation$ = this.store.pipe(select(selectSelectedConversation));

    this.subscription = this.chatService.getAllUserConversations().subscribe((res: IConversationListElement[]) => {
      this.store.dispatch(setInitialConversationList({ conversationList: res }));
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
