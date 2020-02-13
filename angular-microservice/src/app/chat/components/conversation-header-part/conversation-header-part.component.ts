import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-conversation-header-part',
  templateUrl: './conversation-header-part.component.html',
  styleUrls: ['./conversation-header-part.component.scss']
})
export class ConversationHeaderPartComponent implements OnInit {
  @Input() friendName: string;

  constructor() { }

  ngOnInit() {
  }

}
