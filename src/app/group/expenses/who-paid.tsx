import { Colors } from '@/src/constants/colors';
import { CurrentGroupContext } from '@/src/contexts/CurrentGroup';
import { NewExpenseContext } from '@/src/contexts/NewExpense';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useContext } from 'react';
import { Pressable, Text, View } from 'react-native';

export default function WhoPaidScreen() {
  const { currentGroup } = useContext(CurrentGroupContext);
  const { newExpense, setNewExpense } = useContext(NewExpenseContext);
  console.log(newExpense);

  return (
    <View style={{ marginTop: 30 }}>
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
            {member.id === newExpense?.payingMemberId && (
              <FontAwesome
                size={20}
                name="check"
                color={Colors.Green}
                // unFillColor="#FFFFFF"
                // text="Custom Checkbox"
                // iconStyle={{ backgroundColor: 'red' }}
                // innerIconStyle={{ borderWidth: 5, color }}
                // textStyle={{ fontFamily: 'JosefinSans-Regular' }}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}
