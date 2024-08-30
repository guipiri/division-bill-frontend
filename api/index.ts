import { SignUpWithCredentials, SignUpWithGoogle } from '@/app/auth/props';
import { USERS_ENDPOINT } from '@/constants/endpoints';
import axios from 'axios';

export const createUser = async (
  signUpData: SignUpWithCredentials | SignUpWithGoogle,
) => {
  try {
    const { data } = await axios.post(USERS_ENDPOINT, signUpData);
    return data;
  } catch (err: any) {
    return { success: false, message: err.response.data.message };
  }
};
