import { AuthContext } from '@/contexts/AuthContext';
import { useContext } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function TabTwoScreen() {
  const { signOut } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Pressable onPress={signOut}>
        <Text>Fazer logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
