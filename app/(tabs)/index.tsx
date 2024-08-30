import SignUpScreen from '../auth/signUp';

export default function GroupsScreen() {
  // const router = useRouter();
  // const rootNavigationState = useRootNavigationState();

  // useEffect(() => {
  //   // Conferir se o root layout já renderizou antes de fazer o redirecionamento
  //   if (rootNavigationState?.key) {
  //     // Verificar se o usuário está logado e caso não esteja redirecionar para tela de login
  //     router.replace('/auth/signUp');
  //   }
  // }, [router, rootNavigationState]);
  return <SignUpScreen />;
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
