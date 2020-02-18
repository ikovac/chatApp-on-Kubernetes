import { ActionReducerMap } from '@ngrx/store';
import { IConversationListState, conversationListReducer } from './conversation-list.reducers';

export interface IAppState {
  conversationList: IConversationListState,
}

export const reducers: ActionReducerMap<IAppState> = {
  conversationList: conversationListReducer
};
