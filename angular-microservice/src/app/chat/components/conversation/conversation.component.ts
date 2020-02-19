import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IConversationMessage } from 'src/app/shared/interfaces/iConversationMessage';
import { ChatService } from '../../services/chat.service';
import { IConversationListElement } from 'src/app/shared/interfaces/iconversationlistelement';
import { searchForConversation } from 'src/app/ngrx/selectors/chat-app.selectors';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/ngrx/reducers/chat-app.reducers';
import { storeConversationMessages } from 'src/app/ngrx/actions/chat-app.actions';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationComponent implements OnInit, OnChanges, OnDestroy {
  @Input() selectedConversation: IConversationListElement;
  messages: IConversationMessage[];
  storeSubscription: Subscription;
  apiSubscription: Subscription;

  constructor(
    private chatService: ChatService,
    private store: Store<IAppState>
  ) { }

  ngOnInit() {

  }

  ngOnChanges() {
    const { conversationId } = this.selectedConversation;
    this.store.pipe(select(searchForConversation, { conversationId })).subscribe(storeRes => {
      if (!storeRes) {
        this.chatService.getConversationMessages(conversationId).subscribe(res => {
          this.messages = res;
          this.store.dispatch(storeConversationMessages({convMessages: res, conversationId}));
        });
      } else {
        this.messages = storeRes;
      }
    });
  }

  onNewInputMessage(messageText) {

  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
    this.apiSubscription.unsubscribe();
  }
}
