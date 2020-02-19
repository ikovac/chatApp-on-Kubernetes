import { createReducer, on, ActionReducerMap } from '@ngrx/store';

import { IConversationListElement } from 'src/app/shared/interfaces/iconversationlistelement';

import * as chatAppActions from '../actions/chat-app.actions';

export interface IChatAppState {
  conversationList: IConversationListElement[];
  selectedConversation: IConversationListElement | null;
  conversationMessages: object;
  onlineUsers: object;
}

const initialChatAppState: IChatAppState = {
  conversationList: [],
  selectedConversation: null,
  conversationMessages: {},
  onlineUsers: {}
};

const _chatAppReducer = createReducer(
  initialChatAppState,
  on(
    chatAppActions.setInitialConversationList,
    (state, { conversationList }) => ({ ...state, conversationList })
  ),
  on(
    chatAppActions.selectConversation,
    (state, { selectedConversation }) => ({ ...state, selectedConversation })
  ),
  on(
    chatAppActions.storeConversationMessages,
    (state, { convMessages, conversationId }) => ({ ...state, conversationMessages: { ...state.conversationMessages, [conversationId]: convMessages } })
  ),
  on(
    chatAppActions.saveNewMessageOut,
    (state, { newMessageOut, selectedConversation }) => {
      const { conversationId } = selectedConversation;
      const updatedConversationList = state.conversationList.filter(conv => conv.conversationId !== conversationId);
      updatedConversationList.unshift(
        { ...selectedConversation, message_text: newMessageOut.message_text, timestamp: newMessageOut.timestamp }
      );

      let oldConversationMessages = [];
      oldConversationMessages = state.conversationMessages[conversationId];

      oldConversationMessages.push(newMessageOut);

      return {
        ...state,
        conversationMessages: { ...state.conversationMessages, [conversationId]: oldConversationMessages },
        conversationList: updatedConversationList
      };
    }
  ),
);

export function chatAppReducer(state, action) {
  return _chatAppReducer(state, action);
}

export interface IAppState {
  chatApp: IChatAppState;
}

export const reducers: ActionReducerMap<IAppState> = {
  chatApp: chatAppReducer
};
