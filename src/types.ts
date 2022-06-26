import { UserInfo } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

export interface Message {
  uid: string;
  text: string;
  user: User;
  createdAt: Timestamp;
}

export type User = UserInfo;
export interface Room {
  uid: string;
  users: {
    [key: string]: boolean;
  };
}
