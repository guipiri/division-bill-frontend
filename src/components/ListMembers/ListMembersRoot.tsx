import React, { ReactNode } from 'react';
import { View } from 'react-native';

export default function ListMembersRoot({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <View
      key={id}
      style={{
        flexDirection: 'row',
        marginHorizontal: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {children}
    </View>
  );
}
