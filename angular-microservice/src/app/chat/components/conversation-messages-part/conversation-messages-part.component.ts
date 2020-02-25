import { Component, Input, NgZone, AfterViewInit, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { IConversationMessage } from 'src/app/shared/interfaces/iConversationMessage';

@Component({
  selector: 'app-conversation-messages-part',
  templateUrl: './conversation-messages-part.component.html',
  styleUrls: ['./conversation-messages-part.component.scss']
})
export class ConversationMessagesPartComponent implements AfterViewInit {
  @Input() messages: IConversationMessage[];
  @ViewChild('scrollElement', { static: true }) scrollFrame: ElementRef;
  @ViewChildren('messages') itemElements: QueryList<any>;

  private scrollContainer: any;


  constructor(private zone: NgZone) { }

  ngAfterViewInit() {
    this.scrollContainer = this.scrollFrame.nativeElement;
    this.itemElements.changes.subscribe(_ => this.onItemElementsChanged());
    // this.onItemElementsChanged();
  }

  private onItemElementsChanged(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
    });
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
