import { Division } from './Division';

export interface Expense {
  id: string;

  name: string;

  amount: number;

  payingMemberId: string;

  groupId: string;

  division: Division[];

  createdAt: Date;

  updatedAt: Date;
}

export interface CreateExpenseDto
  extends Omit<Expense, 'createdAt' | 'updatedAt' | 'id' | 'division'> {
  expenseDivision: Pick<Division, 'amountBorrowed' | 'userId'>[];
}
