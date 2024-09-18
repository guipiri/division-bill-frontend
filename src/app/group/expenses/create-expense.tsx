import { _createExpense } from '@/src/actions';
import { InputTextComponent } from '@/src/components/InputText';
import { MainActionButton } from '@/src/components/MainActionButton';
import { Colors } from '@/src/constants/colors';
import { CurrentGroupContext } from '@/src/contexts/CurrentGroup';
import { router } from 'expo-router';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function CreateExpenseScreen() {
  const [expenseName, setExpenseName] = useState<string | null>(null);
  const { currentGroup } = useContext(CurrentGroupContext);

  return (
    <View style={styles.container}>
      <InputTextComponent.Root>
        <InputTextComponent.Label title="Nome da despesa" />
        <InputTextComponent.Input
          onChange={(e) => {
            setExpenseName(e.nativeEvent.text);
          }}
        />
      </InputTextComponent.Root>
      <InputTextComponent.Root>
        <InputTextComponent.Label title="Valor da despesa" />
        <InputTextComponent.Input
          onChange={(e) => {
            setExpenseName(e.nativeEvent.text);
          }}
        />
      </InputTextComponent.Root>
      {currentGroup?.members.map((member) => {
        return (
          <View
            key={member.id}
            style={{
              // backgroundColor: Colors.CurrentLine,
              flexDirection: 'row',
              marginHorizontal: 20,
              // alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 20,
            }}
          >
            <Text style={{ color: Colors.Foreground, fontSize: 18 }}>
              {member.name}
            </Text>
            <BouncyCheckbox
              size={25}
              fillColor={Colors.Green}
              // unFillColor="#FFFFFF"
              // text="Custom Checkbox"
              // iconStyle={{ backgroundColor: 'red' }}
              // innerIconStyle={{ borderWidth: 5, color }}
              // textStyle={{ fontFamily: 'JosefinSans-Regular' }}
              onPress={(isChecked: boolean) => {
                console.log(isChecked);
              }}
            />
          </View>
        );
      })}
      <MainActionButton.Root action={() => _createExpense(expenseName, router)}>
        <MainActionButton.Icon name="check-circle" />
      </MainActionButton.Root>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Backgroud,
    marginTop: 20,
  },
});
