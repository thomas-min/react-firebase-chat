import { UserInfo } from 'firebase/auth';

export interface Message {
  uid: string;
  text: string;
  room: Room;
  user: User;
}

export interface User extends UserInfo {
  rooms?: Room[];
}
export interface Room {
  uid: string;
  users: User[];
  messages: Message[];
}
