import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-conversation-participants-dialog',
  templateUrl: './conversation-participants-dialog.component.html',
  styleUrls: ['./conversation-participants-dialog.component.scss']
})
export class ConversationParticipantsDialogComponent implements OnInit {
  conversationParticipants$: Observable<{first_name: string, last_name: string}>;

  constructor(
    public dialogRef: MatDialogRef<ConversationParticipantsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { conversationId: number },
    private chatService: ChatService,
  ) { }

  ngOnInit() {
    const { conversationId } = this.data;
    this.conversationParticipants$ = this.chatService.getConversationParticipants(conversationId);
  }

}
