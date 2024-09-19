import { InputTextComponent } from '@/src/components/InputText';
import { Colors } from '@/src/constants/colors';
import { CurrentGroupContext } from '@/src/contexts/CurrentGroup';
import { NewExpenseContext } from '@/src/contexts/NewExpense';
import { router } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function CreateExpenseScreen() {
  const { newExpense, setNewExpense, resetExpense } =
    useContext(NewExpenseContext);
  const { currentGroup } = useContext(CurrentGroupContext);

  useEffect(() => {
    resetExpense();
  }, [resetExpense]);

  return (
    <ScrollView style={styles.container}>
      <InputTextComponent.Root>
        <InputTextComponent.Label title="Nome da despesa" />
        <InputTextComponent.Input
          onChange={(e) => {
            setNewExpense({ ...newExpense, name: e.nativeEvent.text });
          }}
        />
      </InputTextComponent.Root>
      <InputTextComponent.Root>
        <InputTextComponent.Label title="Valor da despesa" />
        <InputTextComponent.Input
          onChange={(e) => {
            setNewExpense({
              ...newExpense,
              amount: Number(e.nativeEvent.text),
            });
          }}
        />
      </InputTextComponent.Root>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: Colors.Foreground, fontSize: 16 }}>
            Pago por{' '}
          </Text>
          <Pressable
            style={{
              backgroundColor: Colors.CurrentLine,
              borderRadius: 10,
              marginVertical: 10,
            }}
            onPress={() => router.push('/group/expenses/who-paid')}
          >
            <Text
              style={{
                fontWeight: 'bold',
                color: Colors.Foreground,
                marginHorizontal: 10,
                fontSize: 16,
                marginVertical: 5,
              }}
            >
              {
                currentGroup?.members.filter(
                  (members) => members.id === newExpense.payingMemberId,
                )[0].name
              }
            </Text>
          </Pressable>
          <Text
            style={{
              color: Colors.Foreground,
              fontSize: 16,
            }}
          >
            {' '}
            e dividido{' '}
          </Text>
          <Pressable
            style={{
              backgroundColor: Colors.CurrentLine,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',
                color: Colors.Foreground,
                marginHorizontal: 10,
                fontSize: 16,
                marginVertical: 5,
              }}
            >
              IGUALMENTE
            </Text>
          </Pressable>
        </View>
      </View>
      {/* <MainActionButton.Root action={() => _createExpense(expenseName, router)}>
        <MainActionButton.Icon name="check-circle" />
      </MainActionButton.Root> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Backgroud,
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
