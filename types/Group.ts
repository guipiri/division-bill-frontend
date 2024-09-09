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

  createdAt: Date;

  updatedAt: Date;
}
