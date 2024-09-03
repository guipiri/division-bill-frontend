import {
  getUserById,
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from '@/api';
import { User } from '@/types/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { jwtDecode } from 'jwt-decode';
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

export const AuthContext = createContext<{
  user: User | null;
  signIn: (token?: string) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
}>({ user: null, signIn: async () => {}, signOut: () => {}, isLoading: true });

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const signIn = useCallback(async (token?: string) => {
    setIsLoading(true);

    let jwtToken = null;
    if (token) {
      await AsyncStorage.setItem('TOKEN', token);
      jwtToken = token;
    }

    if (!jwtToken) {
      jwtToken = await AsyncStorage.getItem('TOKEN');
      if (!jwtToken) return setIsLoading(false);
    }

    const { sub } = jwtDecode(jwtToken);
    setAuthorizationHeader(jwtToken);
    const user = await getUserById(sub as string);

    if (user) {
      setUser(user);
      router.replace('/');
    }
    setIsLoading(false);
  }, []);

  const signOut = useCallback(() => {
    setIsLoading(true);
    AsyncStorage.removeItem('TOKEN');
    removeAuthorizationHeader();
    setUser(null);
    router.replace('/auth/signIn');
    setIsLoading(false);
  }, []);

  useEffect(() => {
    signIn();
  }, [signIn]);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
