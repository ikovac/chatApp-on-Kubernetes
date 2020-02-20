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
    (state, { newMessageOut, newSelectedConversation }) => {
      const { conversationId } = newSelectedConversation;
      const updatedConversationList = state.conversationList.filter(conv => conv.conversationId !== conversationId);
      updatedConversationList.unshift(newSelectedConversation);

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
  on(
    chatAppActions.saveNewMessageIn,
    (state, { newMessageIn, newConversationListElement }) => {
      const { conversationId } = newConversationListElement;
      const oldConversationListElement = state.conversationList.find(conv => conv.conversationId === conversationId);
      const updatedConversationList = state.conversationList.filter(conv => conv.conversationId !== conversationId);
      updatedConversationList.unshift({ ...newConversationListElement, conversation_name: oldConversationListElement.conversation_name });

      let oldConversationMessages = [];
      oldConversationMessages = state.conversationMessages[conversationId];

      if (!oldConversationMessages) {
        return {
          ...state,
          conversationList: updatedConversationList
        };
      }

      oldConversationMessages.push(newMessageIn);

      return {
        ...state,
        conversationMessages: { ...state.conversationMessages, [conversationId]: oldConversationMessages },
        conversationList: updatedConversationList
      };
    }
  )
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
