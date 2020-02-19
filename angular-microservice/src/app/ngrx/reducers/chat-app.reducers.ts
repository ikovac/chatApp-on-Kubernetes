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
    (state, { conversationList }) => ({ ...state, conversationList }))
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
