import { IAppState } from '../reducers/root.reducers';

export const selectConversationList = (state: IAppState) => state.conversationList.conversationList;
