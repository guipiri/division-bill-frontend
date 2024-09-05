import { User } from './User';

export interface Expense {
  id: string;

  name: string;

  members: User[];

  created_at: Date;

  updated_at: Date;
}
