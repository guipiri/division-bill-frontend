import { createGroup } from '@/api';
import { Router } from 'expo-router';
import { Alert } from 'react-native';

export const _createGroup = async (name: string | null, router: Router) => {
  if (!name) {
    return Alert.alert('Erro', 'O nome do grupo não pode ser vazio!');
  }
  try {
    await createGroup(name);
    Alert.alert('Grupo criado!', 'Agora que tal adicionar seus amigos?');
    router.replace('/');
  } catch (error) {
    console.log(error);
  }
};
