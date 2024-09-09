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
        tabBarActiveBackgroundColor: Colors.CurrentLine,
        tabBarInactiveBackgroundColor: Colors.CurrentLine,
        headerStyle: { backgroundColor: Colors.CurrentLine },
        headerTitleStyle: { color: Colors.Foreground },
        headerTintColor: Colors.Foreground,
      }}
    >
      <Tabs.Screen
        name="expenses/[groupId]"
        options={{
          title: 'Despesas',
          tabBarIcon: ({ color }) => <TabBarIcon name="bars" color={color} />,
        }}
      />
      <Tabs.Screen
        name="members/[groupId]"
        options={{
          title: 'Amigos',
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings/[groupId]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="create/index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
