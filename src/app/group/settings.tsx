import { Colors } from '@/src/constants/colors';
import { CurrentGroupContext } from '@/src/contexts/CurrentGroup';
import React, { useContext } from 'react';
import { Text, View } from 'react-native';

export default function SettingsScreen() {
  const { currentGroup } = useContext(CurrentGroupContext);

  return (
    <View>
      <Text style={{ color: Colors.Foreground }}>
        Settings do grupo {currentGroup?.name}
      </Text>
    </View>
  );
}
