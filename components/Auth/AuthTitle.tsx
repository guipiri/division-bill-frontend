import { Colors } from '@/constants/colors';
import React, { ReactNode } from 'react';
import { Text } from 'react-native';

interface AuthTitleProps {
  children: ReactNode;
}

export default function AuthTitle({ children }: AuthTitleProps) {
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
