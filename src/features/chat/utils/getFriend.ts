import { Room, User } from '~/app/types';
import { getCurrentUserId } from '~/app/utils/firebase';

export const getFriend = (room: Room | null): User | null => {
  if (!room) return null;

  const { users } = room;
  const userIds = Object.keys(users);
  const myId = getCurrentUserId();
  const friendId = userIds.find((id) => id !== myId);
  const friend = users[friendId!];

  return friend;
};
