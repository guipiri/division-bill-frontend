import { Colors } from '@/constants/colors';
import { FontAwesome } from '@expo/vector-icons';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ExpensesScreen() {
  const { groupId } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Link href={`/group/settings/${groupId}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="gear"
                    size={25}
                    color={Colors.Foreground}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Text>Detalhar as despesas do grupo aqui</Text>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });
