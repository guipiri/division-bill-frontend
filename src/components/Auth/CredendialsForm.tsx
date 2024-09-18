import { Colors } from '@/src/constants/colors';
import { SignWithCredentials } from '@/src/types';
import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import CredentialsButton from './CredentialsButton';

export default function CredendialsForm({
  type,
}: {
  type: 'signin' | 'signup';
}) {
  const [signData, setSignData] = useState<SignWithCredentials>({
    email: '',
    password: '',
  });
  return (
    <>
      <TextInput
        onChange={(e) =>
          setSignData({ ...signData, email: e.nativeEvent.text })
        }
        value={signData.email}
        keyboardType="email-address"
        autoComplete="email"
        style={styles.input}
        placeholder="E-mail..."
      />
      <TextInput
        onChange={(e) =>
          setSignData({ ...signData, password: e.nativeEvent.text })
        }
        value={signData.password}
        inputMode="text"
        secureTextEntry={true}
        style={styles.input}
        placeholder="Senha..."
      />
      <CredentialsButton signData={signData} type={type} />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    color: Colors.Backgroud,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: Colors.Foreground,
    borderRadius: 10,
  },
});
