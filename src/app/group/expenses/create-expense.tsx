import {
  _addMemberToEquallyExpense,
  _handleNewAmountsInEquallyExpense,
  _removeMemberFromEquallyExpense,
} from '@/src/actions';
import { InputComponent } from '@/src/components/Input';
import { Colors } from '@/src/constants/colors';
import { CurrentGroupContext } from '@/src/contexts/CurrentGroup';
import { NewExpenseContext } from '@/src/contexts/NewExpense';
import { router } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function CreateExpenseScreen() {
  const { newExpense, setNewExpense, resetExpense } =
    useContext(NewExpenseContext);
  const { currentGroup } = useContext(CurrentGroupContext);

  useEffect(() => {
    resetExpense();
  }, [resetExpense]);

  return (
    <ScrollView style={styles.container}>
      <InputComponent.Root>
        <InputComponent.Label title="Nome da despesa" />
        <InputComponent.Input
          onChange={({ nativeEvent: { text: name } }) => {
            setNewExpense({ ...newExpense, name });
          }}
        />
      </InputComponent.Root>
      <InputComponent.Root>
        <InputComponent.Label title="Valor da despesa R$" />
        <InputComponent.Input
          onChange={({ nativeEvent: { text } }) => {
            _handleNewAmountsInEquallyExpense(newExpense, text, setNewExpense);
          }}
          keyboardType="numeric"
        />
      </InputComponent.Root>
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

      <View style={{ marginVertical: 30 }}>
        {currentGroup?.members.map((member) => {
          return (
            <View
              key={member.id}
              style={{
                flexDirection: 'row',
                marginHorizontal: 40,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Pressable
                style={{
                  width: '100%',
                  paddingVertical: 20,
                }}
                onPress={() => {
                  setNewExpense({
                    ...newExpense,
                    payingMemberId: member.id,
                  });
                  router.back();
                }}
              >
                <Text
                  style={{
                    color: Colors.Foreground,
                    fontSize: 16,
                  }}
                >
                  {member.name}
                </Text>
              </Pressable>
              <BouncyCheckbox
                isChecked={true}
                fillColor={Colors.Green}
                onPress={(checked: boolean) => {
                  if (checked) {
                    _addMemberToEquallyExpense(
                      newExpense,
                      member,
                      setNewExpense,
                    );
                  } else {
                    _removeMemberFromEquallyExpense(
                      newExpense,
                      member,
                      setNewExpense,
                    );
                  }
                }}
              />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Backgroud,
    paddingHorizontal: 20,
  },
});
