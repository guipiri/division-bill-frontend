import { User } from './User';

enum StatusList {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export interface Group {
  id: string;

  name: string;

  members: User[];

  status: StatusList;

  created_at: Date;

  updated_at: Date;
}
