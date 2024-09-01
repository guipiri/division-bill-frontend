import {
  AuthResponse,
  SignUpWithCredentials,
  SignUpWithGoogle,
  User,
} from '@/app/auth/types';
import {
  AUTH_WITH_GOOGLE,
  CREATE_USER_WITH_GOOGLE,
  USERS_ENDPOINT,
} from '@/constants/endpoints';
import { Response } from '@/types';
import axios from 'axios';

export const createUserWithCredentials = async (
  signUpData: SignUpWithCredentials,
) => {
  try {
    const { data } = await axios.post<Response>(USERS_ENDPOINT, signUpData);
    return data;
  } catch (err: any) {
    return { success: false, message: err.response.data.message };
  }
};

export const createUserWithGoogle = async (signUpData: SignUpWithGoogle) => {
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

export const signInWithGoogle = async (idToken: string) => {
  try {
    const {
      data: { token },
    } = await axios.post<AuthResponse>(AUTH_WITH_GOOGLE, {
      idToken,
    });
    setAuthorizationHeader(token);
    return { success: true, message: 'Usuário logado com sucesso!' };
  } catch (err: any) {
    return { success: false, message: err.response.data.message };
  }
};

export const findUserByEmail = async (email: string) => {
  try {
    const { data } = await axios.get<User>(`${USERS_ENDPOINT}/${email}`);
    console.log(data);

    return data;
  } catch (err: any) {
    return { success: false, message: err.response.data.message };
  }
};

export const setAuthorizationHeader = (token: string) => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};
