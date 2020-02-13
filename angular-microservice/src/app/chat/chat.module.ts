import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ConversationComponent } from './components/conversation/conversation.component';
import { ChatRootComponent } from './components/chat-root/chat-root.component';
import { ConversationListComponent } from './components/conversation-list/conversation-list.component';
import { ConversationListComponentComponent } from './components/conversation-list-component/conversation-list-component.component';
import { MessageButtonsSectionComponent } from './components/message-buttons-section/message-buttons-section.component';
import { AngularMaterialModule } from '../angular-material.module';
import { ConversationHeaderPartComponent } from './components/conversation-header-part/conversation-header-part.component';
import { ConversationMessagesPartComponent } from './components/conversation-messages-part/conversation-messages-part.component';
import { ConversationInputPartComponent } from './components/conversation-input-part/conversation-input-part.component';


@NgModule({
  declarations: [
    ChatRootComponent,
    ConversationComponent,
    ConversationListComponent,
    ConversationListComponentComponent,
    MessageButtonsSectionComponent,
    ConversationHeaderPartComponent,
    ConversationMessagesPartComponent,
    ConversationInputPartComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    AngularMaterialModule
  ],
  entryComponents: [ChatRootComponent]
})
export class ChatModule { }
