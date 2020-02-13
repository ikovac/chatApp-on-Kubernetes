import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent implements OnInit {
  @Input() conversationList;
  @Output() emitConversationSelect = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {

  }

  onConversationSelect(selectedConversation) {
    this.emitConversationSelect.emit(selectedConversation);
  }

}
