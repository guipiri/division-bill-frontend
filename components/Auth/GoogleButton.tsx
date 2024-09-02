import { _signInWithGoogle } from '@/app/auth/actions';
import GoogleIcon from '@/assets/images/googleIcon.png';
import { Colors } from '@/constants/colors';
import { AuthContext } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import React, { useContext } from 'react';
import { Image, Pressable, Text } from 'react-native';

export default function GoogleButton() {
  const { setToken } = useContext(AuthContext);
  return (
    <>
      <Text
        style={{
          color: Colors.Foreground,
          textAlign: 'center',
          marginTop: 20,
        }}
      >
        OR
      </Text>
      <Pressable
        onPress={async () => {
          _signInWithGoogle(setToken, router);
        }}
        style={{
          backgroundColor: Colors.Foreground,
          padding: 10,
          borderRadius: 10,
          marginTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image source={GoogleIcon} style={{ width: 20, height: 20 }} />
        <Text
          style={{
            color: Colors.CurrentLine,
            textAlign: 'center',
            fontWeight: 'bold',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Entrar com o Google
        </Text>
      </Pressable>
    </>
  );
}
