import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { FriendListComponent } from './components/friend-list/friend-list.component';
import { ConversationComponent } from './components/conversation/conversation.component';
import { ChatRootComponent } from './components/chat-root/chat-root.component';


@NgModule({
  declarations: [ChatRootComponent, FriendListComponent, ConversationComponent],
  imports: [
    CommonModule,
    ChatRoutingModule
  ],
  entryComponents: [ChatRootComponent]
})
export class ChatModule { }
