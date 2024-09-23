import { Colors } from '@/src/constants/colors';
import React from 'react';
import { Pressable, PressableProps, Text } from 'react-native';

type MemberNameProps = PressableProps & {
  name: string;
};

export default function MemberName({ name, ...rest }: MemberNameProps) {
  return (
    <Pressable
      {...rest}
      style={{
        width: '100%',
        paddingVertical: 20,
      }}
    >
      <Text
        style={{
          color: Colors.Foreground,
          fontSize: 16,
        }}
      >
        {name}
      </Text>
    </Pressable>
  );
}
