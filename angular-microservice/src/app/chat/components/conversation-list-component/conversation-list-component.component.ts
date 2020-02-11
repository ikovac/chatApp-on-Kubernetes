import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-conversation-list-component',
  templateUrl: './conversation-list-component.component.html',
  styleUrls: ['./conversation-list-component.component.scss']
})
export class ConversationListComponentComponent implements OnInit {
  @Input() chatSummaryComponent;

  constructor() { }

  ngOnInit() {
  }

}
