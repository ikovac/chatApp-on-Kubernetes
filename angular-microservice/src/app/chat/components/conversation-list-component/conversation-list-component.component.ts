import { Component, OnInit, Input } from '@angular/core';
import { IConversationListElement } from 'src/app/shared/interfaces/iconversationlistelement';

@Component({
  selector: 'app-conversation-list-component',
  templateUrl: './conversation-list-component.component.html',
  styleUrls: ['./conversation-list-component.component.scss']
})
export class ConversationListComponentComponent implements OnInit {
  @Input() chatSummaryComponent: IConversationListElement;

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

}
