import React, { ReactNode } from 'react';
import { View, ViewProps } from 'react-native';

type MemberRootProps = { children: ReactNode } & ViewProps;

export default function MemberRoot({ children, ...rest }: MemberRootProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 40,
        justifyContent: 'space-between',
        ...new Object(rest.style),
      }}
    >
      {children}
    </View>
  );
}
