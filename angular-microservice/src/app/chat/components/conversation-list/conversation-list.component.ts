import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent implements OnInit {
  @Input() conversationList;

  constructor() { }

  ngOnInit() {

  }

}
