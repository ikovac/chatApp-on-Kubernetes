import { createAction, props } from '@ngrx/store';
import { IConversationListElement } from 'src/app/shared/interfaces/iconversationlistelement';
import { SET_INITIAL_CONVERSATION_LIST } from './action.types';

export const setInitialConversationList = createAction(
  SET_INITIAL_CONVERSATION_LIST,
  props<{conversationList: IConversationListElement[]}>()
);
