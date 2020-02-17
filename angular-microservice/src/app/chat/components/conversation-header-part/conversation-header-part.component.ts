import { Component, OnInit, Input } from '@angular/core';
import { IConversationListElement } from 'src/app/shared/interfaces/iconversationlistelement';

@Component({
  selector: 'app-conversation-header-part',
  templateUrl: './conversation-header-part.component.html',
  styleUrls: ['./conversation-header-part.component.scss']
})
export class ConversationHeaderPartComponent implements OnInit {
  @Input() selectedConversation: IConversationListElement;

  constructor() { }

  ngOnInit() {
  }

}
