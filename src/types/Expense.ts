import { Division } from './Division';

export interface Expense {
  id: string;

  name: string;

  amount: number;

  payingMemberId: string;

  groupId: string;

  division: Division[];

  createdAt: string;

  updatedAt: string;
}

export interface CreateExpenseDto
  extends Omit<Expense, 'createdAt' | 'updatedAt' | 'id' | 'division'> {
  expenseDivision: Pick<Division, 'amountBorrowed' | 'userId'>[];
}
