import { createAction, props } from '@ngrx/store';
import { IConversationListElement } from 'src/app/shared/interfaces/iconversationlistelement';
import { SET_INITIAL_CONVERSATION_LIST, SELECT_CONVERSATION, STORE_CONVERSATION_MESSAGES, SAVE_NEW_MESSAGE_OUT, SAVE_NEW_MESSAGE_IN } from './action.types';
import { IConversationMessage } from 'src/app/shared/interfaces/iConversationMessage';

export const setInitialConversationList = createAction(
  SET_INITIAL_CONVERSATION_LIST,
  props<{ conversationList: IConversationListElement[] }>()
);

export const selectConversation = createAction(
  SELECT_CONVERSATION,
  props<{ selectedConversation: IConversationListElement }>()
);

export const storeConversationMessages = createAction(
  STORE_CONVERSATION_MESSAGES,
  props<{ convMessages: IConversationMessage[], conversationId: number }>()
);

export const saveNewMessageOut = createAction(
  SAVE_NEW_MESSAGE_OUT,
  props<{ newMessageOut: IConversationMessage, newSelectedConversation: IConversationListElement }>()
);

export const saveNewMessageIn = createAction(
  SAVE_NEW_MESSAGE_IN,
  props<{ newMessageIn: IConversationMessage, newConversationListElement: IConversationListElement }>()
);
