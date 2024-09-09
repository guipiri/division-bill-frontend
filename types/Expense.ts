import { User } from './User';

export interface Expense {
  id: string;

  name: string;

  members: User[];

  createdAt: Date;

  updatedAt: Date;
}
