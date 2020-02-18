import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { IConversationMessage } from 'src/app/shared/interfaces/iConversationMessage';
import { ChatService } from '../../services/chat.service';
import { IConversationListElement } from 'src/app/shared/interfaces/iconversationlistelement';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationComponent implements OnInit, OnChanges {
  @Input() selectedConversation: IConversationListElement;

  messages$: Observable<IConversationMessage[]>;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.messages$ = this.chatService.getConversationMessages(this.selectedConversation.conversationId);
  }


}
