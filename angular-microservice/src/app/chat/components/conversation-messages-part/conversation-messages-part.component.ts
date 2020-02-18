import { Component, OnInit, Input } from '@angular/core';
import { IConversationMessage } from 'src/app/shared/interfaces/iConversationMessage';

@Component({
  selector: 'app-conversation-messages-part',
  templateUrl: './conversation-messages-part.component.html',
  styleUrls: ['./conversation-messages-part.component.scss']
})
export class ConversationMessagesPartComponent implements OnInit {
  @Input() messages: IConversationMessage[];

  constructor() { }

  ngOnInit() {
  }

  timeSectionFormatter(timestamp) {
    const date = new Date(timestamp);
    const currentDate = new Date();

    if (currentDate.toLocaleDateString() === date.toLocaleDateString()) {
      return date.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' });
    }


    if (
      currentDate.getMonth() === date.getMonth() &&
      currentDate.getFullYear() === date.getFullYear() &&
      currentDate.getDate() === date.getDate() + 1) {
      return 'jučer';
    }

    const mm = ("0" + (date.getMonth() + 1)).slice(-2);
    const dd = ("0" + date.getDate()).slice(-2);
    const yy = date.getFullYear();

    return `${dd}. ${mm}. ${yy}`;
  }

  getElementHeight(element) {
    setTimeout(() => {
      return element;
    }, 0);
  }

}
