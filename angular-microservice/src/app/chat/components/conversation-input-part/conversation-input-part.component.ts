import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-conversation-input-part',
  templateUrl: './conversation-input-part.component.html',
  styleUrls: ['./conversation-input-part.component.scss']
})
export class ConversationInputPartComponent implements OnInit {
  @Output() emitInputMessage = new EventEmitter<string>();
  messageText = '';

  constructor() { }

  ngOnInit() {
  }

  onFormSubmit() {
    this.emitInputMessage.emit(this.messageText);
    this.messageText = '';
  }
}
