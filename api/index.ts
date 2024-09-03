import {
  AuthResponse,
  SignUpWithGoogle,
  SignWithCredentials,
} from '@/app/auth/types';
import {
  AUTH_WITH_CREDENTIALS,
  AUTH_WITH_GOOGLE,
  CREATE_USER_WITH_GOOGLE,
  USERS_ENDPOINT,
} from '@/constants/endpoints';
import { Response } from '@/types';
import { User, UserFromGoogle } from '@/types/User';
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
  { email, id: google_id, name, photo }: UserFromGoogle,
) => {
  try {
    // Get the backend JWT token
    const token = await getJwtToken(idToken);

    // Create or update user with this email in database
    await upsertUserWithGoogle({ email, google_id, name, photo });

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
  } catch (err) {
    console.log(err);
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
