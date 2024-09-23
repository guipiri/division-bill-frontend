import { GoogleSignin } from '@react-native-google-signin/google-signin';

import {
  createExpense,
  createGroup,
  createUserWithCredentials,
  getExpensesByGroupId,
  getGroupsByUserId,
  signInWithCredentials,
  signInWithGoogle,
} from '@/src/api';
import { SignWithCredentials } from '@/src/types';
import { Group } from '@/src/types/Group';
import { Router } from 'expo-router';
import { Alert } from 'react-native';
import { CreateExpenseDto } from '../types/Expense';

export const _getExpensesByGroupId = async (groupId: string) => {
  try {
    const expenses = await getExpensesByGroupId(groupId);
    return expenses;
  } catch {
    return null;
  }
};

export const _createGroup = async (
  name: string | undefined,
  router: Router,
) => {
  if (!name) {
    return Alert.alert('Erro', 'O nome do grupo não pode ser vazio!');
  }
  try {
    await createGroup(name);
    Alert.alert('Grupo criado!', 'Agora que tal adicionar seus amigos?');
    router.replace('/');
  } catch (error) {
    console.log(error);
  }
};

export const _getGroupsByUserId = async (
  userId: string,
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>,
) => {
  try {
    const groups = await getGroupsByUserId(userId);
    setGroups(groups);
  } catch (error) {
    console.log(error);
  }
};

export const _createExpense = async (
  newExpense: CreateExpenseDto,
  getCurrentGroup: (groupId: string) => Promise<void>,
  router: Router,
) => {
  const { amount, name, expenseDivision } = newExpense;
  if (!name)
    return Alert.alert('Erro', 'O nome da despesa não pode ser vazio!');

  if (expenseDivision.length === 0)
    return Alert.alert(
      'Erro',
      'A despesa tem que ser dividida em pelo menos um membro',
    );

  if (amount === 0)
    return Alert.alert('Erro', 'Uma despesa muito barata, não?');
  console.log(newExpense);

  try {
    await createExpense(newExpense);
    await getCurrentGroup(newExpense.groupId);
    Alert.alert('Despesa criada!', '💸');
    router.back();
  } catch (error: any) {
    console.log(error.response.data.message);
  }
};

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
});

export const _signUpWithCredentials = async (
  { email, password }: SignWithCredentials,
  router?: Router,
) => {
  try {
    const { success, message } = await createUserWithCredentials({
      email,
      password,
    });
    Alert.alert(success ? 'Sucesso' : 'Falha', message);
    router?.replace('/auth/signIn');
  } catch (error) {
    console.log(error);
  }
};

export const _signInWithCredentials = async (
  signInData: SignWithCredentials,
  signIn: (token?: string) => Promise<void>,
) => {
  try {
    const {
      data: { token },
    } = await signInWithCredentials(signInData);
    await signIn(token);
  } catch (error: any) {
    Alert.alert('Erro', `${error.response.data.message}`);
  }
};

export const _signInWithGoogle = async (
  signIn: (token?: string) => Promise<void>,
) => {
  try {
    await GoogleSignin.hasPlayServices();
    const { idToken, user } = await GoogleSignin.signIn();
    const res = await signInWithGoogle(idToken as string, user);
    await signIn(res.data?.token);
  } catch (error: any) {
    console.log(error);

    // Alert.alert('Erro', `${error.response.data.message}`);
  }
};

export const _addMemberToEquallyExpense = (
  newExpense: CreateExpenseDto,
  member: Group['members'][0],
  setNewExpense: React.Dispatch<React.SetStateAction<CreateExpenseDto>>,
) => {
  // setNewExpense({
  //   ...newExpense,
  //   expenseDivision: [
  //     ...newExpense.expenseDivision.map((division) => ({
  //       ...division,
  //       amountBorrowed:
  //         newExpense.amount / (newExpense.expenseDivision.length + 1),
  //     })),
  //     {
  //       userId: member.id,
  //       amountBorrowed:
  //         newExpense.amount / (newExpense.expenseDivision.length + 1),
  //     },
  //   ],
  // });
  newExpense.expenseDivision.push({ userId: member.id, amountBorrowed: 0 });
  _handleNewAmountsInEquallyExpense(
    newExpense,
    String(newExpense.amount),
    setNewExpense,
  );
};

export const _removeMemberFromEquallyExpense = (
  newExpense: CreateExpenseDto,
  member: Group['members'][0],
  setNewExpense: React.Dispatch<React.SetStateAction<CreateExpenseDto>>,
) => {
  const newDivision = newExpense.expenseDivision
    .filter((division) => division.userId !== member.id)
    .map((division, index, array) => ({
      ...division,
      amountBorrowed: newExpense.amount / array.length,
    }));
  setNewExpense({
    ...newExpense,
    expenseDivision: newDivision,
  });
};

export const _handleNewAmountsInEquallyExpense = (
  newExpense: CreateExpenseDto,
  amountString: string,
  setNewExpense: React.Dispatch<React.SetStateAction<CreateExpenseDto>>,
) => {
  const amount = Number(
    amountString.replace('R$ ', '').replaceAll('.', '').replaceAll(',', '.'),
  );
  console.log(
    amountString.replace('R$', '').replaceAll('.', '').replaceAll(',', '.'),
  );

  if (isNaN(amount))
    return Alert.alert('Opa!', 'Este campo deve ser um número!');

  setNewExpense({
    ...newExpense,
    amount: amount,
    expenseDivision: newExpense.expenseDivision.map(
      (division, index, array) => {
        if (index + 1 === array.length) {
          // If the division is a recurring decimal, we set the last
          // amountBorroed as the subtraction between the total amount and
          // the total amountBorrowed to other user
          return {
            ...division,
            amountBorrowed: Number(
              (
                amount -
                (array.length - 1) * Number((amount / array.length).toFixed(2))
              ).toFixed(2),
            ),
          };
        }
        return {
          ...division,
          amountBorrowed: Number((amount / array.length).toFixed(2)),
        };
      },
    ),
  });
};
