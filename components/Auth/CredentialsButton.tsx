import {
  _signInWithCredentials,
  _signUpWithCredentials,
} from '@/app/auth/actions';
import { SignWithCredentials } from '@/app/auth/types';
import { Colors } from '@/constants/colors';
import { AuthContext } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import React, { useContext } from 'react';
import { Pressable, Text } from 'react-native';

interface CredentialsButtonProps {
  type: 'signin' | 'signup';
  signData: SignWithCredentials;
}

export default function CredentialsButton({
  type,
  signData,
}: CredentialsButtonProps) {
  const { setToken } = useContext(AuthContext);
  return (
    <Pressable
      onPress={() =>
        type === 'signup'
          ? _signUpWithCredentials(signData, router)
          : _signInWithCredentials(signData, setToken, router)
      }
      style={{
        backgroundColor: Colors.Green,
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
      }}
    >
      <Text
        style={{
          color: Colors.CurrentLine,
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        {type === 'signin' ? 'Entrar' : 'Criar conta'}
      </Text>
    </Pressable>
  );
}
