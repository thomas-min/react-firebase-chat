import { atom } from 'recoil';
import { User } from '~/types';

export const searchResultState = atom<User[]>({
  key: 'userSearchResult',
  default: [],
});
