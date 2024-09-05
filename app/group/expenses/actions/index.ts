import { getExpensesByGroupId } from '@/api';

export const _getExpensesByGroupId = async (groupId: string) => {
  try {
    const expenses = await getExpensesByGroupId(groupId);
    return expenses;
  } catch {
    return null;
  }
};
