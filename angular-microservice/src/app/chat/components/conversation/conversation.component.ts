import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IConversationMessage } from 'src/app/shared/interfaces/iConversationMessage';
import { ChatService } from '../../services/chat.service';
import { IConversationListElement } from 'src/app/shared/interfaces/iconversationlistelement';
import { searchForConversation } from 'src/app/ngrx/selectors/chat-app.selectors';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/ngrx/reducers/chat-app.reducers';
import { storeConversationMessages, saveNewMessageOut } from 'src/app/ngrx/actions/chat-app.actions';
import { LoginService } from 'src/app/login/login.service';

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
    private store: Store<IAppState>,
    private loginService: LoginService,
  ) { }

  ngOnInit() {

  }

  ngOnChanges() {
    const { conversationId } = this.selectedConversation;
    this.store.pipe(select(searchForConversation, { conversationId })).subscribe(storeRes => {
      if (!storeRes) {
        this.chatService.getConversationMessages(conversationId).subscribe(res => {
          this.messages = res;
          this.store.dispatch(storeConversationMessages({ convMessages: res, conversationId }));
        });
      } else {
        this.messages = storeRes;
      }
    });
  }

  onNewInputMessage(messageText) {
    const { conversationId, is_group } = this.selectedConversation;
    const user = this.loginService.getLoggedInUser();
    const newMessageOut: IConversationMessage = {
      message_text: messageText,
      message_class: 'message-out',
      conversationId,
      is_group,
      timestamp: new Date(),
      userId: user.id,
    };

    if (is_group) {
      newMessageOut.sender = user.first_name + ' ' + user.last_name;
    }

    this.store.dispatch(saveNewMessageOut({ newMessageOut, selectedConversation: this.selectedConversation}));
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
    this.apiSubscription.unsubscribe();
  }
}
