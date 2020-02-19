import { IAppState, IChatAppState } from '../reducers/chat-app.reducers';

export const selectConversationList = (state: IAppState) => state.chatApp.conversationList;

export const selectSelectedConversation = (state: IAppState) => state.chatApp.selectedConversation;

export const searchForConversation = (state: IAppState, props) => {
  const { conversationId } = props;
  return state.chatApp.conversationMessages[conversationId];
};

