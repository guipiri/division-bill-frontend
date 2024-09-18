import { Colors } from '@/src/constants/colors';
import { AuthContext } from '@/src/contexts/AuthContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs } from 'expo-router';
import React, { useContext } from 'react';
import { Text } from 'react-native';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { user, isLoading } = useContext(AuthContext);
  if (isLoading) return <Text>Is loading...</Text>;
  if (!user) return <Redirect href={'/auth/signIn'} />;
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
