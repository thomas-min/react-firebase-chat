import { UserInfo } from 'firebase/auth';
import { atom } from 'recoil';

export const searchResultState = atom<UserInfo[]>({
  key: 'userSearchResult',
  default: [],
});
