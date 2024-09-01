import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Router } from 'expo-router';

import { createUserWithCredentials, signInWithGoogle } from '@/api';
import { SignUpWithCredentials } from '../types';

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
});

export const _signUpWithEmailAndPassword = async (
  { email, password }: SignUpWithCredentials,
  router?: Router,
) => {
  try {
    const res = await createUserWithCredentials({ email, password });
    console.log(res);

    // Alert.alert(success ? 'Sucesso' : 'Falha', message);
    // if (success) router?.replace('/auth/signIn');
  } catch (error) {
    console.log(error);
  }
};

export const _signInWithEmailAndPassword = async (
  { email, password }: SignUpWithCredentials,
  router?: Router,
) => {};

export const _signInWithGoogle = async (router?: Router) => {
  try {
    await GoogleSignin.hasPlayServices();
    const { idToken } = await GoogleSignin.signIn();
    const res = await signInWithGoogle(idToken as string);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
