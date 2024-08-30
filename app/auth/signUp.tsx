import GoogleIcon from '@/assets/images/googleIcon.png';
import { Colors } from '@/constants/colors';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { _signInWithGoogle, _signUpWithEmailAndPassword } from './actions';
import { SignUpWithCredentials } from './props';

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
});

export default function SignUpScreen() {
  const router = useRouter();
  const [signUpData, setSignUpData] = useState<SignUpWithCredentials>({
    email: '',
    password: '',
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: Colors.CurrentLine,
          padding: 20,
          borderRadius: 10,
          width: '100%',
        }}
      >
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            color: Colors.Foreground,
            marginBottom: 20,
          }}
        >
          Criar Conta
        </Text>
        <TextInput
          onChange={(e) =>
            setSignUpData({ ...signUpData, email: e.nativeEvent.text })
          }
          value={signUpData.email}
          keyboardType="email-address"
          autoComplete="email"
          style={styles.input}
          placeholder="E-mail..."
        />
        <TextInput
          onChange={(e) =>
            setSignUpData({ ...signUpData, password: e.nativeEvent.text })
          }
          value={signUpData.password}
          inputMode="text"
          secureTextEntry={true}
          style={styles.input}
          placeholder="Senha..."
        />
        <Pressable
          onPress={() => _signUpWithEmailAndPassword(signUpData, router)}
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
            Criar Conta
          </Text>
        </Pressable>
        <Pressable
          onPress={async () => {
            _signInWithGoogle();
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.Backgroud,
  },
  input: {
    color: Colors.Backgroud,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: Colors.Foreground,
    borderRadius: 10,
  },
});
