import { Expense } from './Expense';
import { User } from './User';

enum StatusList {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export interface Group {
  id: string;

  name: string;

  status: StatusList;

  members: Pick<User, 'id' | 'name'>[];

  expenses: Expense[];

  createdAt: Date;

  updatedAt: Date;
}
