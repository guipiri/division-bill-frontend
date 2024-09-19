import { InputComponent } from '@/src/components/Input';
import { Colors } from '@/src/constants/colors';
import { CurrentGroupContext } from '@/src/contexts/CurrentGroup';
import { NewExpenseContext } from '@/src/contexts/NewExpense';
import { router } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
          onChange={(e) => {
            setNewExpense({ ...newExpense, name: e.nativeEvent.text });
          }}
        />
      </InputComponent.Root>
      <InputComponent.Root>
        <InputComponent.Label title="Valor da despesa R$" />
        <InputComponent.Input
          onChange={(e) => {
            const amount = Number(e.nativeEvent.text.replaceAll(',', '.'));

            if (isNaN(amount))
              return Alert.alert('Opa!', 'Este campo deve ser um número!');

            setNewExpense({
              ...newExpense,
              amount: amount,
              division: newExpense.division.map((division) => {
                return {
                  ...division,
                  amountBorrowed: amount / newExpense.division.length,
                };
              }),
            });
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
                // size={50}
                // useBuiltInState={false}
                // iconImageStyle={styles.iconImageStyle}
                // iconStyle={{ borderColor: 'green' }}
                onPress={(checked: boolean) => {
                  if (checked) {
                    setNewExpense({
                      ...newExpense,
                      division: [
                        ...newExpense.division.map((division) => ({
                          ...division,
                          amountBorrowed:
                            newExpense.amount /
                            (newExpense.division.length + 1),
                        })),
                        {
                          userId: member.id,
                          amountBorrowed:
                            newExpense.amount /
                            (newExpense.division.length + 1),
                        },
                      ],
                    });
                  } else {
                    const newDivision = newExpense.division
                      .filter((division) => division.userId !== member.id)
                      .map((division, index, array) => ({
                        ...division,
                        amountBorrowed: newExpense.amount / array.length,
                      }));
                    setNewExpense({
                      ...newExpense,
                      division: newDivision,
                    });
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
