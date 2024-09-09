import { GoogleSignin } from '@react-native-google-signin/google-signin';

import {
  createUserWithCredentials,
  signInWithCredentials,
  signInWithGoogle,
} from '@/api';
import { Router } from 'expo-router';
import { Alert } from 'react-native';
import { SignWithCredentials } from '../types';

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
    console.log(res);
  } catch (error: any) {
    console.log(error);

    // Alert.alert('Erro', `${error.response.data.message}`);
  }
};
