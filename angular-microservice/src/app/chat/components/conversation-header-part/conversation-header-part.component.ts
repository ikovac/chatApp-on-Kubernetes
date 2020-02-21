import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IConversationListElement } from 'src/app/shared/interfaces/iconversationlistelement';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/ngrx/reducers/chat-app.reducers';
import { Subscription } from 'rxjs';
import { getOnlineUsers } from 'src/app/ngrx/selectors/chat-app.selectors';

@Component({
  selector: 'app-conversation-header-part',
  templateUrl: './conversation-header-part.component.html',
  styleUrls: ['./conversation-header-part.component.scss']
})
export class ConversationHeaderPartComponent implements OnInit, OnDestroy {
  @Input() selectedConversation: IConversationListElement;
  onlineStatus = false;
  subscription: Subscription;

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
    if (!this.selectedConversation.is_group) {
      this.subscription = this.store.pipe(select(getOnlineUsers))
        .subscribe(onlineUsers => {
          this.onlineStatus = onlineUsers.includes(this.selectedConversation.conversation_name);
        });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
