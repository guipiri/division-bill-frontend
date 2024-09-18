import { Colors } from '@/src/constants/colors';
import { AuthContext } from '@/src/contexts/AuthContext';
import { useContext } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function TabTwoScreen() {
  const { signOut } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Pressable onPress={signOut}>
        <Text style={{ color: Colors.Foreground }}>Fazer logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Backgroud,
  },
});
