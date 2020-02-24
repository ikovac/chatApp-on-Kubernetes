import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { takeWhile, flatMap } from 'rxjs/operators';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-message-buttons-section',
  templateUrl: './message-buttons-section.component.html',
  styleUrls: ['./message-buttons-section.component.scss']
})
export class MessageButtonsSectionComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private chatService: ChatService,
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
            console.log("conversation");
            return this.chatService.newConversation(result.conversationParticipants.id);
          } else {
            console.log("group");
            return this.chatService.newGroup(result.groupParticipants, result.groupName);
          }
        })
      )
      .subscribe(res => {
        console.log("Res: ", res);
      });
  }

}
