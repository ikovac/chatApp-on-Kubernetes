import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ConversationComponent } from './components/conversation/conversation.component';
import { ChatRootComponent } from './components/chat-root/chat-root.component';
import { ConversationListComponent } from './components/conversation-list/conversation-list.component';
import { ConversationListComponentComponent } from './components/conversation-list-component/conversation-list-component.component';


@NgModule({
  declarations: [ChatRootComponent, ConversationComponent, ConversationListComponent, ConversationListComponentComponent],
  imports: [
    CommonModule,
    ChatRoutingModule
  ],
  entryComponents: [ChatRootComponent]
})
export class ChatModule { }
