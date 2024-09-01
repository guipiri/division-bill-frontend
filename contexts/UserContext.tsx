import { User } from '@/types/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode } from 'react';

export const UserContext = createContext<User | null>(null);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const keys = async () => {
    const keys = await AsyncStorage.getItem('USER');
    console.log(keys);
    console.log('oijasoij');
  };
  keys();

  return <UserContext.Provider value={null}>{children}</UserContext.Provider>;
}
