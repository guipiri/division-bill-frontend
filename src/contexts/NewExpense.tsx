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
  division: [],
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

  const resetExpense = useCallback(() => {
    if (!currentGroup || !user) return;

    const initialState = {
      amount: 0,
      division: currentGroup?.members.map((member, index, array) => {
        return {
          userId: member.id,
          amountBorrowed: newExpense.amount / array.length,
        };
      }),
      name: '',
      payingMemberId: user.id || '',
      groupId: currentGroup.id || '',
    };

    setNewExpense(initialState);
  }, [currentGroup, newExpense.amount, user]);

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
