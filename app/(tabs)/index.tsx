import { useRootNavigationState } from 'expo-router';
import { useExpoRouter } from 'expo-router/build/global-state/router-store';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function GroupsScreen() {
  const router = useExpoRouter();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    // Conferir se o root layout já renderizou antes de fazer o redirecionamento
    if (rootNavigationState?.key) {
      // Verificar se o usuário está logado e caso não esteja redirecionar para tela de login
      router.replace('/auth/signUp');
    }
  }, [router, rootNavigationState]);
  return (
    <View>
      <Text>Oii</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
