import { Colors } from '@/constants/colors';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

export default function ListGroupsScreen() {
  return (
    <View style={styles.container}>
      <Pressable
        style={{ alignSelf: 'flex-end', marginBottom: 36, marginRight: 36 }}
        onPress={() => router.push('/group/create')}
      >
        <FontAwesome name="plus-circle" size={56} color={Colors.Green} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    backgroundColor: Colors.Backgroud,
  },
});
