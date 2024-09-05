import { getGroupsByUserId } from '@/api';
import { Group } from '@/types/Group';

export const _getGroupsByUserId = async (
  userId: string,
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>,
) => {
  try {
    const groups = await getGroupsByUserId(userId);
    setGroups(groups);
  } catch (error) {
    console.log(error);
  }
};
