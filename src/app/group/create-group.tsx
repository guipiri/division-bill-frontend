import { _createGroup } from '@/src/actions';
import { MainActionButton } from '@/src/components/MainActionButton';
import { Colors } from '@/src/constants/colors';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function CreateGroupScreen() {
  const [groupName, setGroupName] = useState<string | null>(null);
  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: 20 }}>
        <Text
          style={{
            color: Colors.Foreground,
          }}
        >
          Nome do grupo
        </Text>
        <TextInput
          onChange={(e) => {
            setGroupName(e.nativeEvent.text);
          }}
          style={{
            borderBottomColor: Colors.Green,
            borderBottomWidth: 1,
            color: Colors.Foreground,
            marginVertical: 10,
          }}
        />
      </View>
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
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
