export interface IConversationListElement {
  id?: number;
  message_text: string;
  timestamp: Date;
  conversation_name: string;
  conversationId: number;
  is_group: boolean;
}
