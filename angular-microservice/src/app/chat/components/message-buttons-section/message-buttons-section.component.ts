import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { takeWhile, flatMap } from 'rxjs/operators';
import { ChatService } from '../../services/chat.service';
import { IConversationListElement } from 'src/app/shared/interfaces/iconversationlistelement';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/ngrx/reducers/chat-app.reducers';
import { selectConversation } from 'src/app/ngrx/actions/chat-app.actions';

@Component({
  selector: 'app-message-buttons-section',
  templateUrl: './message-buttons-section.component.html',
  styleUrls: ['./message-buttons-section.component.scss']
})
export class MessageButtonsSectionComponent implements OnInit {
  groupName: string;
  conversationName: string;

  constructor(
    public dialog: MatDialog,
    private chatService: ChatService,
    private readonly store: Store<IAppState>,
  ) { }

  ngOnInit() {
  }

  openDialog(isGroup: boolean): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        conversationParticipants: null,
        isGroup,
        groupName: null,
        groupParticipants: [],
      }
    });

    dialogRef.afterClosed()
      .pipe(
        takeWhile(result => result),
        flatMap(result => {
          if (!result.isGroup) {
            const { first_name, last_name } = result.conversationParticipants;
            this.conversationName = first_name + ' ' + last_name;
            return this.chatService.newConversation(result.conversationParticipants.id);
          } else {
            this.groupName = result.groupName;
            return this.chatService.newGroup(result.groupParticipants, result.groupName);
          }
        })
      )
      .subscribe(res => {
        console.log("RES: ", res);
        let newSelectedConversation: IConversationListElement;
        if (res.is_group) {
          newSelectedConversation = {
            conversationId: res.id,
            is_group: res.is_group,
            conversation_name: this.groupName
          };
        } else {
          newSelectedConversation = {
            conversationId: res.conversationId,
            is_group: res.is_group,
            conversation_name: this.conversationName
          };
        }

        this.store.dispatch(selectConversation({ selectedConversation: newSelectedConversation }));
      });
  }

}
