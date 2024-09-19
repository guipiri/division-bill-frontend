import { _createGroup } from '@/src/actions';
import { InputComponent } from '@/src/components/Input';
import { MainActionButton } from '@/src/components/MainActionButton';
import { Colors } from '@/src/constants/colors';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function CreateGroupScreen() {
  const [groupName, setGroupName] = useState<string | null>(null);
  return (
    <View style={styles.container}>
      <InputComponent.Root>
        <InputComponent.Label title="Nome do grupo" />
        <InputComponent.Input
          onChange={(e) => {
            setGroupName(e.nativeEvent.text);
          }}
        />
      </InputComponent.Root>
      <MainActionButton.Root action={() => _createGroup(groupName, router)}>
        <MainActionButton.Icon name="check-circle" />
      </MainActionButton.Root>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Backgroud,
    // justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
