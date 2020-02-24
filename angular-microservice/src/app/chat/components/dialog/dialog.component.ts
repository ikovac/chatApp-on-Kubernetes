import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChatService } from '../../services/chat.service';
import { IUser } from 'src/app/shared/interfaces/iuser';
import { Observable } from 'rxjs';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  friendList$: Observable<IUser[]>;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private chatService: ChatService,
  ) { }

  ngOnInit() {
    this.friendList$ = this.chatService.getFriendList();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
