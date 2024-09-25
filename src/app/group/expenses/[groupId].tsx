import { MainActionButton } from '@/src/components/MainActionButton';
import { Colors } from '@/src/constants/colors';
import { CurrentGroupContext } from '@/src/contexts/CurrentGroup';
import { handleDate } from '@/src/utils/handleDate';
import { FontAwesome } from '@expo/vector-icons';
import { Link, router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const headerRight = () => (
  <>
    <Link href={`/group/settings`} asChild>
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
  </>
);

export default function ExpensesScreen() {
  const { groupId } = useLocalSearchParams();
  const { currentGroup, setCurrentGroupId } = useContext(CurrentGroupContext);

  useEffect(() => {
    if (groupId) setCurrentGroupId(groupId as string);
  }, [groupId, setCurrentGroupId]);

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={{ height: 10 }}></View>
        {currentGroup?.expenses.map(({ id, amount, name, createdAt }) => {
          return (
            <Pressable key={id} style={styles.expenseContainer}>
              <Text style={styles.expenseCreatedAt}>
                {handleDate(createdAt)}
              </Text>
              <View>
                <Text style={styles.expenseName}>{name}</Text>
                <Text style={{ color: Colors.Foreground }}>
                  Você pegou emprestado X reais!
                </Text>
              </View>
              <Text style={styles.expenseAmount}>
                {amount.toLocaleString('pt-BR', {
                  currency: 'BRL',
                  style: 'currency',
                })}
              </Text>
            </Pressable>
          );
        })}
        <View style={{ height: 100 }}></View>
      </ScrollView>
      <Stack.Screen
        options={{
          title: `${currentGroup?.name}`,
          headerRight,
        }}
      />
      <MainActionButton.Root
        action={() => {
          router.push('/group/expenses/create-expense');
        }}
      >
        <MainActionButton.Icon />
      </MainActionButton.Root>
    </>
  );
}

const styles = StyleSheet.create({
  container: { gap: 50 },
  expenseContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Colors.CurrentLine,
    marginHorizontal: 20,
    borderRadius: 6,
  },
  expenseCreatedAt: {
    width: 30,
    textAlign: 'center',
    color: Colors.Foreground,
    margin: 20,
  },
  expenseName: {
    color: Colors.Foreground,
    marginBottom: 10,
    fontSize: 16,
  },
  expenseAmount: {
    color: Colors.Foreground,
    margin: 20,
  },
});
