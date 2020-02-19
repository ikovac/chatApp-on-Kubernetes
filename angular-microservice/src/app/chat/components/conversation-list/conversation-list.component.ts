import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IConversationListElement } from 'src/app/shared/interfaces/iconversationlistelement';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/ngrx/reducers/chat-app.reducers';
import { selectConversation } from 'src/app/ngrx/actions/chat-app.actions';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent implements OnInit {
  @Input() conversationList: IConversationListElement[];

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {

  }

  onConversationSelect(selectedConversation) {
    this.store.dispatch(selectConversation({selectedConversation}));
  }

}
