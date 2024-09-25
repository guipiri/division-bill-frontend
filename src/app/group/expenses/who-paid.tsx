import { Member } from '@/src/components/Member';
import { Colors } from '@/src/constants/colors';
import { CurrentGroupContext } from '@/src/contexts/CurrentGroup';
import { NewExpenseContext } from '@/src/contexts/NewExpense';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useContext } from 'react';
import { View } from 'react-native';

export default function WhoPaidScreen() {
  const { currentGroup } = useContext(CurrentGroupContext);
  const { newExpense, setNewExpense } = useContext(NewExpenseContext);
  console.log(newExpense);

  return (
    <View style={{ marginTop: 30 }}>
      {currentGroup?.members.map((member) => {
        return (
          <Member.MemberRoot key={member.id} style={{ alignItems: 'center' }}>
            <Member.MemberName
              style={{ width: '100%' }}
              name={member.name as string}
              onPress={() => {
                setNewExpense({
                  ...newExpense,
                  payingMemberId: member.id,
                });
                router.back();
              }}
            />
            {member.id === newExpense?.payingMemberId && (
              <FontAwesome size={20} name="check" color={Colors.Green} />
            )}
          </Member.MemberRoot>
        );
      })}
    </View>
  );
}
