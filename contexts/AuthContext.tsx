import { getUserById, setAuthorizationHeader } from '@/api';
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
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  isLoading: boolean;
}>({ user: null, token: null, setToken: () => {}, isLoading: true });

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getTokenFromStorage = async () => {
    return await AsyncStorage.getItem('TOKEN');
  };

  const getUser = useCallback(async () => {
    setIsLoading(true);
    const jwtToken = await getTokenFromStorage();
    if (!jwtToken) return setIsLoading(false);

    setAuthorizationHeader(jwtToken);
    const { sub } = jwtDecode(jwtToken);
    const user = await getUserById(sub as string);

    if (user) {
      setUser(user);
      router.replace('/');
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser, token]);

  return (
    <AuthContext.Provider value={{ user, token, setToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
