import React, { ReactNode } from 'react';
import { Pressable } from 'react-native';

export default function MainActionButtonRoot({
  action,
  children,
}: {
  action: () => void;
  children: ReactNode;
}) {
  return (
    <Pressable
      style={{
        alignSelf: 'flex-end',
        bottom: 36,
        right: 36,
        position: 'absolute',
      }}
      onPress={action}
    >
      {children}
    </Pressable>
  );
}
