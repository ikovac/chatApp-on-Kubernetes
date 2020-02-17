export interface dbAllUserConversations {
    message_text: string;
    timestamp: Date;
    is_group: boolean;
    group_name?: string;
    first_name?: string;
    last_name?:string;
    conversationId: number;
}