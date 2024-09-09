import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function GroupSettingsScreen() {
  const { groupId } = useLocalSearchParams();
  return (
    <View>
      <Text>{groupId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
