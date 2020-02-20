import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketIoService } from '../../services/socket-io.service';
import { ChatService } from '../../services/chat.service';
import { Observable, Subscription } from 'rxjs';
import { IConversationListElement } from 'src/app/shared/interfaces/iconversationlistelement';
import { Store, select } from '@ngrx/store';
import { selectConversationList, selectSelectedConversation } from 'src/app/ngrx/selectors/chat-app.selectors';
import { IAppState } from 'src/app/ngrx/reducers/chat-app.reducers';
import { setInitialConversationList, saveNewMessageIn } from 'src/app/ngrx/actions/chat-app.actions';
import { IConversationMessage } from 'src/app/shared/interfaces/iConversationMessage';

@Component({
  selector: 'app-chat-root',
  templateUrl: './chat-root.component.html',
  styleUrls: ['./chat-root.component.scss']
})
export class ChatRootComponent implements OnInit, OnDestroy {
  conversationList$: Observable<IConversationListElement[]>; // dohvati se tako da se posalje request serveru.
  selectedConversation$; // kada se klikne na neki razgovor ucitaj taj razgovor tako da posaljes request na server.
  apiSubscription: Subscription;
  socketSubscription: Subscription;

  constructor(
    private socketService: SocketIoService,
    private chatService: ChatService,
    private store: Store<IAppState>
  ) { }

  ngOnInit() {
    this.conversationList$ = this.store.pipe(select(selectConversationList));
    this.selectedConversation$ = this.store.pipe(select(selectSelectedConversation));

    this.apiSubscription = this.chatService.getAllUserConversations().subscribe((res: IConversationListElement[]) => {
      this.store.dispatch(setInitialConversationList({ conversationList: res }));
    });

    this.socketService.onMsg()
      .subscribe((payload: { newMessageIn: IConversationMessage, newConversationListElement: IConversationListElement }) => {
        this.store.dispatch(saveNewMessageIn(payload));
      });
  }

  ngOnDestroy() {
    this.apiSubscription.unsubscribe();
    this.socketSubscription.unsubscribe();
  }
}
