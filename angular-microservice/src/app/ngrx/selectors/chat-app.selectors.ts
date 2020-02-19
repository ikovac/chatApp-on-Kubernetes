import { IAppState } from '../reducers/chat-app.reducers';

export const selectConversationList = (state: IAppState) => state.chatApp.conversationList;
