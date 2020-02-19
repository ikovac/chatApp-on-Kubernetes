export interface IConversationMessages {
    id: number;
    message_text: string;
    timestamp: Date;
    userId: number;
    conversationId: number;
    is_group: boolean;
    sender: any;
    message_class: string;
}