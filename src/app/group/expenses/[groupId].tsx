import { getGroupDetailsByGroupId } from '@/src/api';
import { Colors } from '@/src/constants/colors';
import { Group } from '@/src/types/Group';
import { FontAwesome } from '@expo/vector-icons';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const headerRight = (groupId: string) => (
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
);

export default function ExpensesScreen() {
  const [group, setGroup] = useState<Group | null>(null);
  const { groupId } = useLocalSearchParams();

  const getGroup = useCallback(async (groupId: string) => {
    const group = await getGroupDetailsByGroupId(groupId as string);
    setGroup(group);
  }, []);

  useEffect(() => {
    if (groupId) getGroup(groupId as string);
  }, [getGroup, groupId]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: `${group?.name}`,
          headerRight: () => headerRight(groupId as string),
        }}
      />
      {group?.expenses.map((expense) => {
        return (
          <View
            key={expense.id}
            style={{
              flexDirection: 'row',
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'space-around',
              backgroundColor: Colors.CurrentLine,
              marginHorizontal: 20,
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                width: 30,
                textAlign: 'center',
                color: Colors.Foreground,
                margin: 20,
              }}
            >
              {new Date(expense.createdAt)
                .toLocaleDateString('pt-BR', {
                  // dateStyle: 'long',
                  month: 'short',
                  day: 'numeric',
                })
                .replace('de', '')}
            </Text>
            <View>
              <Text
                style={{
                  color: Colors.Foreground,
                  marginBottom: 10,
                  fontSize: 16,
                }}
              >
                {expense.name}
              </Text>
              <Text style={{ color: Colors.Foreground }}>
                Você pegou emprestado X reais!
              </Text>
            </View>
            <Text
              style={{
                color: Colors.Foreground,
                margin: 20,
              }}
            >
              R$ {expense.amount.toPrecision(4).replace('.', ',')}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });
