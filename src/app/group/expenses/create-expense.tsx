import {
  _addMemberToEquallyExpense,
  _createExpense,
  _handleNewAmountsInEquallyExpense,
  _removeMemberFromEquallyExpense,
} from '@/src/actions';
import { InputComponent } from '@/src/components/Input';
import { Member } from '@/src/components/Member';
import TextForeground from '@/src/components/Text/TextForeground';
import { Colors } from '@/src/constants/colors';
import { CurrentGroupContext } from '@/src/contexts/CurrentGroup';
import { NewExpenseContext } from '@/src/contexts/NewExpense';
import { DivisionType } from '@/src/types/Division';
import { CreateExpenseDto } from '@/src/types/Expense';
import { FontAwesome } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Masks } from 'react-native-mask-input';

const headerRight = (
  newExpense: CreateExpenseDto,
  getCurrentGroup: (groupId: string) => Promise<void>,
) => (
  <Pressable
    onPress={() => {
      _createExpense(newExpense, getCurrentGroup, router);
    }}
  >
    {({ pressed }) => (
      <FontAwesome
        name="check"
        size={25}
        color={pressed ? Colors.Green : Colors.Foreground}
        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
      />
    )}
  </Pressable>
);

export default function CreateExpenseScreen() {
  const { newExpense, setNewExpense, resetExpense } =
    useContext(NewExpenseContext);
  const { currentGroup, getCurrentGroup } = useContext(CurrentGroupContext);
  const [divisionType, setDivisionType] = useState<DivisionType>(
    DivisionType.EQUALLY,
  );
  const [showDivisionTypesAccordion, setShowDivisionTypesAccordion] =
    useState<boolean>(false);

  useEffect(() => {
    resetExpense();
  }, [resetExpense]);

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          title: `${currentGroup?.name}`,
          headerRight: () => headerRight(newExpense, getCurrentGroup),
        }}
      />
      <InputComponent.Root>
        <InputComponent.Label title="Nome da despesa" />
        <InputComponent.Input
          mask={new Array(25).fill(/./)}
          onChangeText={(masked, unmasked) => {
            setNewExpense({ ...newExpense, name: unmasked });
          }}
        />
      </InputComponent.Root>

      <InputComponent.Root>
        <InputComponent.Label title="Valor da despesa" />
        <InputComponent.Input
          mask={Masks.BRL_CURRENCY}
          onChangeText={(masked, unmasked) => {
            _handleNewAmountsInEquallyExpense(
              newExpense,
              masked,
              setNewExpense,
            );
          }}
          keyboardType="numeric"
        />
      </InputComponent.Root>

      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <View style={styles.expenseResume}>
          <TextForeground>Pago por </TextForeground>

          <Pressable
            style={{ ...styles.pressableButton, marginVertical: 10 }}
            onPress={() => router.push('/group/expenses/who-paid')}
          >
            <TextForeground style={styles.textButton}>
              {currentGroup?.members
                .filter(
                  (members) => members.id === newExpense.payingMemberId,
                )[0]
                .name?.toUpperCase()}
            </TextForeground>
          </Pressable>

          <TextForeground> e dividido </TextForeground>

          {!showDivisionTypesAccordion && (
            <Pressable
              style={styles.pressableButton}
              onPress={() => setShowDivisionTypesAccordion(true)}
            >
              <TextForeground style={styles.textButton}>
                {divisionType}
              </TextForeground>
            </Pressable>
          )}

          {showDivisionTypesAccordion && (
            <View
              style={{
                ...styles.pressableButton,
                width: 180,
              }}
            >
              <Pressable
                onPress={() => {
                  setDivisionType(DivisionType.EQUALLY);
                  setShowDivisionTypesAccordion(false);
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <TextForeground style={styles.textButton}>
                  IGUALMENTE
                </TextForeground>
                {divisionType === DivisionType.EQUALLY && (
                  <FontAwesome
                    size={20}
                    name="check"
                    color={Colors.Green}
                    style={{ marginRight: 10 }}
                  />
                )}
              </Pressable>

              <Pressable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onPress={() => {
                  setDivisionType(DivisionType.UNEQUALLY);
                  setShowDivisionTypesAccordion(false);
                }}
              >
                <TextForeground style={styles.textButton}>
                  DESIGUALMENTE
                </TextForeground>
                {divisionType === DivisionType.UNEQUALLY && (
                  <FontAwesome
                    size={20}
                    name="check"
                    color={Colors.Green}
                    style={{ marginRight: 10 }}
                  />
                )}
              </Pressable>
            </View>
          )}
        </View>
      </View>

      <View style={{ marginVertical: 30 }}>
        {currentGroup?.members.map((member) => {
          const amountBorrowed = newExpense.expenseDivision.filter(
            (division) => division.userId === member.id,
          )[0]?.amountBorrowed;

          return (
            <Member.MemberRoot key={member.id}>
              <Member.MemberName name={member.name as string} />
              {divisionType === DivisionType.EQUALLY && (
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
              )}

              {divisionType === DivisionType.UNEQUALLY && (
                <InputComponent.Root>
                  <InputComponent.Input
                    mask={Masks.BRL_CURRENCY}
                    value={amountBorrowed.toFixed(2)}
                    onChangeText={(masked, unmasked) => {
                      setNewExpense({
                        ...newExpense,
                        expenseDivision: newExpense.expenseDivision.map(
                          (division) => {
                            if (division.userId === member.id) {
                              return {
                                ...division,
                                amountBorrowed: Number(
                                  masked
                                    .replace('R$ ', '')
                                    .replaceAll('.', '')
                                    .replaceAll(',', '.'),
                                ),
                              };
                            }

                            return division;
                          },
                        ),
                      });
                    }}
                    keyboardType="numeric"
                  />
                </InputComponent.Root>
              )}
            </Member.MemberRoot>
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
  textButton: {
    fontWeight: 'bold',
    marginHorizontal: 10,
    fontSize: 16,
    marginVertical: 5,
  },
  pressableButton: {
    backgroundColor: Colors.CurrentLine,
    borderRadius: 10,
  },
  expenseResume: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
