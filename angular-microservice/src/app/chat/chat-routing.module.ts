import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatRootComponent } from './chat-root.component';


const routes: Routes = [
  {path: '', component: ChatRootComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
