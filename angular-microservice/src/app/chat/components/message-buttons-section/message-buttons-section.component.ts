import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-message-buttons-section',
  templateUrl: './message-buttons-section.component.html',
  styleUrls: ['./message-buttons-section.component.scss']
})
export class MessageButtonsSectionComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

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
      .pipe(takeWhile(result => result))
      .subscribe(result => {
        console.log("result: ", result);
        // Send request to server depends on isGroup

        // After server returns respons make selectedConversation = serverResponse + isGroup, conversationName
      });
  }

}
