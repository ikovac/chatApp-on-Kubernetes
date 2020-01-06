import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatRootComponent } from './chat-root.component';


@NgModule({
  declarations: [ChatRootComponent],
  imports: [
    CommonModule,
    ChatRoutingModule
  ],
  entryComponents: [ChatRootComponent]
})
export class ChatModule { }
