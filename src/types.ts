import { UserInfo } from 'firebase/auth';

export interface Message {
  uid: string;
  text: string;
  user: User;
}

export type User = UserInfo;
export interface Room {
  uid: string;
  users: {
    [key: string]: boolean;
  };
}
