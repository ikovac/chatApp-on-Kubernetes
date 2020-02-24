import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChatService } from '../../services/chat.service';
import { IUser } from 'src/app/shared/interfaces/iuser';
import { Observable } from 'rxjs';

export interface DialogData {
  conversationParticipants?: IUser;
  isGroup?: boolean;
  groupName?: string;
  groupParticipants?: number[];
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

  onFriendClick(friend) {
    this.data.conversationParticipants = friend;
  }

  onFriendGroupClick(friend) {
    if (!this.data.groupParticipants) {
      this.data.groupParticipants = [];
    }
    if (!this.data.groupParticipants.includes(friend.id)) {
      this.data.groupParticipants.push(friend.id);
    } else {
      this.data.groupParticipants = this.data.groupParticipants.filter(el => el !== friend.id);
    }
  }

  isFriendSelectedInGroup(friendId) {
    return (this.data.groupParticipants || []).includes(friendId);
  }

  isFriendSelectedInConversation(friendId) {
    const { conversationParticipants } = this.data;

    if (!conversationParticipants) {
      return false;
    }

    return conversationParticipants.id === friendId;
  }

  checkIfValid() {
    const { isGroup, groupParticipants, groupName, conversationParticipants } = this.data;

    if (isGroup) {
      return (groupParticipants && groupParticipants.length && groupName) ? true : false;
    }

    return conversationParticipants ? true : false;
  }
}
