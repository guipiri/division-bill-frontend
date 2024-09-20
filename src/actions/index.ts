import { GoogleSignin } from '@react-native-google-signin/google-signin';

import {
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

export const _createGroup = async (name: string | null, router: Router) => {
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

export const _createExpense = async (name: string | null, router: Router) => {
  if (!name) {
    return Alert.alert('Erro', 'O nome da despesa não pode ser vazio!');
  }
  try {
    await createGroup(name);
    Alert.alert('Despesa criada!', '💸');
    router.replace('/');
  } catch (error) {
    console.log(error);
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
  setNewExpense({
    ...newExpense,
    division: [
      ...newExpense.division.map((division) => ({
        ...division,
        amountBorrowed: newExpense.amount / (newExpense.division.length + 1),
      })),
      {
        userId: member.id,
        amountBorrowed: newExpense.amount / (newExpense.division.length + 1),
      },
    ],
  });
};

export const _removeMemberFromEquallyExpense = (
  newExpense: CreateExpenseDto,
  member: Group['members'][0],
  setNewExpense: React.Dispatch<React.SetStateAction<CreateExpenseDto>>,
) => {
  const newDivision = newExpense.division
    .filter((division) => division.userId !== member.id)
    .map((division, index, array) => ({
      ...division,
      amountBorrowed: newExpense.amount / array.length,
    }));
  setNewExpense({
    ...newExpense,
    division: newDivision,
  });
};
