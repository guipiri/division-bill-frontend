import { Colors } from '@/src/constants/colors';
import { AuthContextProvider } from '@/src/contexts/AuthContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const options = {
  headerStyle: {
    backgroundColor: Colors.CurrentLine,
  },
  headerTitleStyle: { color: Colors.Foreground },
  headerTintColor: Colors.Foreground,
  contentStyle: { backgroundColor: Colors.Backgroud },
};

function RootLayoutNav() {
  return (
    <AuthContextProvider>
      <Stack screenOptions={options}>
        <Stack.Screen
          name="(tabs)"
          options={{
            ...options,
            headerShown: false,
            contentStyle: { backgroundColor: Colors.Backgroud },
          }}
        />
        <Stack.Screen name="auth/signUp" options={{ title: 'Criar conta' }} />
        <Stack.Screen name="auth/signIn" options={{ title: 'Division Bill' }} />
        {/* <Stack.Screen name="group/[...groupId]" />a */}
        <Stack.Screen
          name="group/create-group"
          options={{ title: 'Criar grupo' }}
        />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </AuthContextProvider>
  );
}
