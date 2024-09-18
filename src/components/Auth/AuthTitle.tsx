import { Colors } from '@/src/constants/colors';
import React, { ReactNode } from 'react';
import { Text } from 'react-native';

export default function AuthTitle({ children }: { children: ReactNode }) {
  return (
    <Text
      style={{
        fontSize: 20,
        textAlign: 'center',
        color: Colors.Foreground,
        marginBottom: 20,
      }}
    >
      {children}
    </Text>
  );
}
