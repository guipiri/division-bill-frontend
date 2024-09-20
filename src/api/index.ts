import {
  AUTH_WITH_CREDENTIALS,
  AUTH_WITH_GOOGLE,
  CREATE_USER_WITH_GOOGLE,
  EXPENSES_ENDPOINT,
  GROUPS_ENDPOINT,
  USERS_ENDPOINT,
} from '@/src/constants/endpoints';
import {
  AuthResponse,
  Response,
  SignUpWithGoogle,
  SignWithCredentials,
} from '@/src/types';
import { CreateExpenseDto, Expense } from '@/src/types/Expense';
import { Group } from '@/src/types/Group';
import { User, UserFromGoogle } from '@/src/types/User';
import axios from 'axios';

export const createUserWithCredentials = async (
  signUpData: SignWithCredentials,
) => {
  try {
    const { data } = await axios.post<Response>(USERS_ENDPOINT, signUpData);
    return data;
  } catch (err: any) {
    return { success: false, message: err.response?.data?.message };
  }
};

export const upsertUserWithGoogle = async (signUpData: SignUpWithGoogle) => {
  try {
    const { data } = await axios.post<Response>(
      CREATE_USER_WITH_GOOGLE,
      signUpData,
    );
    return data;
  } catch (err: any) {
    return { success: false, message: err.response.data.message };
  }
};

export const signInWithCredentials = async (
  signInData: SignWithCredentials,
) => {
  return await axios.post<{ token: string; expiresIn: string }>(
    AUTH_WITH_CREDENTIALS,
    signInData,
  );
};

export const signInWithGoogle = async (
  idToken: string,
  { email, id: googleId, name, photo }: UserFromGoogle,
) => {
  try {
    // Create or update user with this email in database
    await upsertUserWithGoogle({ email, googleId, name, photo });
    // Get the backend JWT token
    const token = await getJwtToken(idToken);
    // Set jwt token in Authorization header
    setAuthorizationHeader(token);

    // Return the success message
    return {
      success: true,
      message: 'Usuário logado com sucesso!',
      data: { token },
    };
  } catch (err: any) {
    return { success: false, message: err.response.data.message };
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const { data } = await axios.get<User>(`${USERS_ENDPOINT}/${email}`);
    return data;
  } catch (err: any) {
    return { success: false, message: err.response.data.message };
  }
};

export const getUserById = async (id: string) => {
  try {
    const { data } = await axios.get<User>(`${USERS_ENDPOINT}/${id}`);
    return data;
  } catch {
    return null;
  }
};

export const getJwtToken = async (idToken: string) => {
  const {
    data: { token },
  } = await axios.post<AuthResponse>(AUTH_WITH_GOOGLE, {
    idToken,
  });
  return token;
};

export const setAuthorizationHeader = (token: string) => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};

export const removeAuthorizationHeader = () => {
  axios.defaults.headers.common['Authorization'] = '';
};

export const createGroup = async (name: string) => {
  return await axios.post<Response>(GROUPS_ENDPOINT, { name });
};

export const getGroupsByUserId = async (userId: string) => {
  const { data } = await axios.get<Group[]>(
    GROUPS_ENDPOINT + `?userId=${userId}`,
  );
  return data;
};

export const createExpense = async (newExpense: CreateExpenseDto) => {
  const { data } = await axios.post<Response>(EXPENSES_ENDPOINT, newExpense);
  console.log(data);
};

export const getExpensesByGroupId = async (groupId: string) => {
  const { data } = await axios.get<Expense[]>(
    EXPENSES_ENDPOINT + `?groupId=${groupId}`,
  );
  return data;
};

export const getGroupDetailsByGroupId = async (groupId: string) => {
  const { data } = await axios.get<Group>(GROUPS_ENDPOINT + `/${groupId}`);
  return data;
};
