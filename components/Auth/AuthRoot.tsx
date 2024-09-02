import { Colors } from '@/constants/colors';
import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

export default function AuthRoot({ children }: { children: ReactNode }) {
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: Colors.CurrentLine,
          padding: 20,
          borderRadius: 10,
          width: '100%',
        }}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.Backgroud,
  },
});
