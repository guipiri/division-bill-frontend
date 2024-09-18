import { Division } from './Division';

export interface Expense {
  id: string;

  name: string;

  amount: number;

  payingMemberId: string;

  division: Division[];

  createdAt: Date;

  updatedAt: Date;
}
