import { Colors } from '@/src/constants/colors';
import React, { ReactNode } from 'react';
import { Text, TextProps } from 'react-native';

type TextForegroundProps = {
  children: ReactNode;
} & TextProps;

export default function TextForeground({
  children,
  ...rest
}: TextForegroundProps) {
  return (
    <Text
      {...rest}
      style={{
        color: Colors.Foreground,
        fontSize: 16,
        ...new Object(rest.style),
      }}
    >
      {children}
    </Text>
  );
}
