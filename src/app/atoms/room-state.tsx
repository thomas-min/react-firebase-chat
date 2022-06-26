import { atom } from 'recoil';
import { Room } from '~/types';

export const roomState = atom<Room | null>({
  key: 'chatRoom',
  default: null,
});
