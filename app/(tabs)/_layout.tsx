import { Colors } from '@/constants/colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.Green,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        // headerShown: true,
        tabBarActiveBackgroundColor: Colors.Backgroud,
        tabBarInactiveBackgroundColor: Colors.Backgroud,
        headerStyle: { backgroundColor: Colors.Backgroud },
        headerTitleStyle: { color: Colors.Foreground },
        headerTintColor: Colors.Foreground,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Grupos',
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Conta',
          tabBarIcon: ({ color }) => <TabBarIcon name="bars" color={color} />,
        }}
      />
    </Tabs>
  );
}
