import { _signInWithGoogle } from '@/src/actions';
import GoogleIcon from '@/src/assets/images/googleIcon.png';
import { Colors } from '@/src/constants/colors';
import { AuthContext } from '@/src/contexts/Auth';
import React, { useContext } from 'react';
import { Image, Pressable, Text } from 'react-native';

export default function GoogleButton() {
  const { signIn } = useContext(AuthContext);
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
          _signInWithGoogle(signIn);
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
