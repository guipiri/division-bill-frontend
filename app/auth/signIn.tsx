import { Auth } from '@/components/Auth';
import { Colors } from '@/constants/colors';
import { Link } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

export default function SignInScreen() {
  return (
    <Auth.AuthRoot>
      <Auth.AuthTitle>Entre na sua conta...</Auth.AuthTitle>
      <Auth.AuthForm type="signin" />
      <Auth.GoogleButton />
      <Text style={{ color: Colors.Foreground, marginTop: 20 }}>
        Se ainda não tiver um conta,{' '}
        <Link href={'/auth/signUp'} style={{ color: Colors.Green }}>
          <Text>crie uma!</Text>
        </Link>
      </Text>
    </Auth.AuthRoot>
  );
}
