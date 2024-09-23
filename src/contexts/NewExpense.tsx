import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { CreateExpenseDto } from '../types/Expense';
import { AuthContext } from './Auth';
import { CurrentGroupContext } from './CurrentGroup';

const initialState = {
  amount: 0,
  expenseDivision: [],
  name: '',
  payingMemberId: '',
  groupId: '',
};

export const NewExpenseContext = createContext<{
  newExpense: CreateExpenseDto;
  setNewExpense: React.Dispatch<React.SetStateAction<CreateExpenseDto>>;
  resetExpense: () => void;
}>({
  newExpense: initialState,
  setNewExpense: () => {},
  resetExpense: () => {},
});

export default function NewExpenseProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useContext(AuthContext);

  const { currentGroup } = useContext(CurrentGroupContext);
  const [newExpense, setNewExpense] = useState<CreateExpenseDto>(initialState);
  const [divisionType, setDivisionType] = useState<'equally' | 'unequally'>(
    'equally',
  );
  console.log(newExpense);

  const resetExpense = useCallback(() => {
    if (!currentGroup || !user) return;

    const initialState = {
      name: '',
      amount: 0,
      expenseDivision: currentGroup.members.map((member) => {
        return { userId: member.id, amountBorrowed: 0 };
      }),
      payingMemberId: user.id,
      groupId: currentGroup.id,
    };

    setNewExpense(initialState);
  }, [user, currentGroup]);

  useEffect(() => {
    resetExpense();
  }, [resetExpense]);

  return (
    <NewExpenseContext.Provider
      value={{ newExpense, setNewExpense, resetExpense }}
    >
      {children}
    </NewExpenseContext.Provider>
  );
}
