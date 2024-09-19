import React, { ReactNode } from 'react';
import { View } from 'react-native';

export default function InputRoot({ children }: { children: ReactNode }) {
  return <View style={{ marginTop: 20 }}>{children}</View>;
}
