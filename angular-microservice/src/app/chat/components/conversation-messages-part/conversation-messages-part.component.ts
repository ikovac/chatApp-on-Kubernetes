import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-conversation-messages-part',
  templateUrl: './conversation-messages-part.component.html',
  styleUrls: ['./conversation-messages-part.component.scss']
})
export class ConversationMessagesPartComponent implements OnInit {
  @Input() messages;

  constructor() { }

  ngOnInit() {
  }

}
