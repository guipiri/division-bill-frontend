import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import TextForeground from '../Text/TextForeground';

type MemberNameProps = PressableProps & {
  name: string;
};

export default function MemberName({ name, ...rest }: MemberNameProps) {
  return (
    <Pressable
      {...rest}
      style={{
        paddingVertical: 20,
        ...new Object(rest.style),
      }}
    >
      <TextForeground>{name}</TextForeground>
    </Pressable>
  );
}
