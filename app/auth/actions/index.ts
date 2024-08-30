import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Router } from 'expo-router';

import { createUser } from '@/api';
import { SignUpWithCredentials } from '../props';

export const _signUpWithEmailAndPassword = async (
  { email, password }: SignUpWithCredentials,
  router?: Router,
) => {
  try {
    const res = await createUser({ email, password });
    // console.log(res);

    // Alert.alert(success ? 'Sucesso' : 'Falha', message);
    // if (success) router?.replace('/auth/signIn');
  } catch (error) {
    console.log(error);
  }
};

export const _signInWithEmailAndPassword = async (
  { email, password }: SignUpWithCredentials,
  router?: Router,
) => {
  try {
    const { message, success } = await createUser({ email, password });
    // Alert.alert(success ? 'Sucesso' : 'Falha', message);
    // if (success) router?.replace('/auth/signIn');
  } catch (error) {
    console.log(error);
  }
};

export const _signInWithGoogle = async (router?: Router) => {
  await GoogleSignin.hasPlayServices();
  const {
    user: { email, name, id },
  } = await GoogleSignin.signIn();
  const res = await createUser({ email, name, google_id: id });
  console.log(res);
};
