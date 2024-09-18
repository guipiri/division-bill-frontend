import { Colors } from '@/src/constants/colors';
import React from 'react';
import { Text } from 'react-native';

export default function InputTextLabel({ title }: { title: string }) {
  return (
    <Text
      style={{
        color: Colors.Foreground,
      }}
    >
      {title}
    </Text>
  );
}
