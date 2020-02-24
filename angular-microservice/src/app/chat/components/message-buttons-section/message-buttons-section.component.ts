import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-message-buttons-section',
  templateUrl: './message-buttons-section.component.html',
  styleUrls: ['./message-buttons-section.component.scss']
})
export class MessageButtonsSectionComponent implements OnInit {
  conversationParticipants: any;
  groupName: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(isGroup: boolean): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {conversationParticipants: this.conversationParticipants, isGroup, groupName: this.groupName}
    });

    /* dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("result: ", result);
      this.animal = result;
    }); */
  }

}
