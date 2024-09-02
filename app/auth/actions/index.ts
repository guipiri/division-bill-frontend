import { GoogleSignin } from '@react-native-google-signin/google-signin';

import {
  createUserWithCredentials,
  setAuthorizationHeader,
  signInWithCredentials,
  signInWithGoogle,
} from '@/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  setToken: React.Dispatch<React.SetStateAction<string | null>>,
  router: Router,
) => {
  try {
    const {
      data: { token },
    } = await signInWithCredentials(signInData);
    AsyncStorage.setItem('TOKEN', token);
    setAuthorizationHeader(token);
    setToken(token);
  } catch (error: any) {
    Alert.alert('Erro', `${error.response.data.message}`);
  }
};

export const _signInWithGoogle = async (
  setToken: React.Dispatch<React.SetStateAction<string | null>>,
  router: Router,
) => {
  try {
    await GoogleSignin.hasPlayServices();
    const { idToken, user } = await GoogleSignin.signIn();
    const res = await signInWithGoogle(idToken as string, user);
    //Save jwt token on async storage an setToken state
    AsyncStorage.setItem('TOKEN', res.data?.token || '');
    setToken(res.data?.token || null);
  } catch (error) {
    console.log(error);
  }
};
