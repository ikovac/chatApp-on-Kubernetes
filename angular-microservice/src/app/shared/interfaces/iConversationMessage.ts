export interface IConversationMessage {
  id: number;
  message_text: string;
  timestamp: Date;
  userId: number;
  is_group: boolean;
  sender: any;
  message_class: string;
}
