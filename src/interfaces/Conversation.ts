import { Message } from './Message';
import { User } from './User';

export interface Conversation {
  _id: string;
  sender: User;
  receiver: User;
  unreadMsg: number;
  lastMsg: Message;
  userDetails: User;
}
