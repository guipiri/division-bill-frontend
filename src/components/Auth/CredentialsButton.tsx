import { _signInWithCredentials, _signUpWithCredentials } from '@/src/actions';
import { Colors } from '@/src/constants/colors';
import { AuthContext } from '@/src/contexts/AuthContext';
import { SignWithCredentials } from '@/src/types';
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
  const { signIn } = useContext(AuthContext);
  return (
    <Pressable
      onPress={() =>
        type === 'signup'
          ? _signUpWithCredentials(signData, router)
          : _signInWithCredentials(signData, signIn)
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
