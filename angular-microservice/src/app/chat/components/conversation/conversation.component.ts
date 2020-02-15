import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationComponent implements OnInit {
  @Input() selectedConversation;

  constructor() { }

  ngOnInit() {
  }
}
