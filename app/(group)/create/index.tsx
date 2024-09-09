import { Colors } from '@/constants/colors';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { _createGroup } from './actions';

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
      <Pressable
        style={{ alignSelf: 'flex-end', marginBottom: 36, marginRight: 36 }}
        onPress={() => _createGroup(groupName, router)}
      >
        <FontAwesome name="check-circle" size={56} color={Colors.Green} />
      </Pressable>
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
