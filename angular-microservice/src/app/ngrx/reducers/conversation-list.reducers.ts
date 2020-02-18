import { IConversationListElement } from 'src/app/shared/interfaces/iconversationlistelement';
import { createReducer, on } from '@ngrx/store';
import * as conversationListActions from '../actions/conversation-list.actions';

export interface IConversationListState {
  conversationList: IConversationListElement[];
}

const initialConversationListState: IConversationListState = {
  conversationList: [],
};

const _conversationListReducer = createReducer(
  initialConversationListState,
  on(
    conversationListActions.setInitialConversationList,
    (state, { conversationList }) => ({ ...state, conversationList }))
);

export function conversationListReducer(state, action) {
  return _conversationListReducer(state, action);
}
