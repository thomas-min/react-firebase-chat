import { atom } from 'recoil';
import { User } from '~/app/types';

export const searchResultState = atom<User[]>({
  key: 'userSearchResult',
  default: [],
});
