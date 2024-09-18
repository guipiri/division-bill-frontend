import React, { ReactNode } from 'react';
import { View } from 'react-native';

export default function InputTextRoot({ children }: { children: ReactNode }) {
  return <View style={{ marginHorizontal: 20 }}>{children}</View>;
}
