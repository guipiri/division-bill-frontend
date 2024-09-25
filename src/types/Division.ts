export interface Division {
  id: string;

  amountBorrowed: number;

  userId: string;

  expenseId: string;

  createdAt: Date;

  updatedAt: Date;
}

export enum DivisionType {
  EQUALLY = 'IGUALMENTE',
  UNEQUALLY = 'DESIGUALMENTE',
}
