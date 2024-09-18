import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { getGroupDetailsByGroupId } from '../api';
import { Group } from '../types/Group';

export const CurrentGroupContext = createContext<{
  currentGroup: Group | null;
  setCurrentGroupId: React.Dispatch<React.SetStateAction<string | null>>;
}>({ currentGroup: null, setCurrentGroupId: () => {} });

export default function CurrentGroupContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null);
  const [currentGroupId, setCurrentGroupId] = useState<string | null>(null);

  const getCurrentGroup = useCallback(async (groupId: string) => {
    const group = await getGroupDetailsByGroupId(groupId as string);
    setCurrentGroup(group);
  }, []);

  useEffect(() => {
    if (currentGroupId) getCurrentGroup(currentGroupId);
  }, [getCurrentGroup, currentGroupId]);

  return (
    <CurrentGroupContext.Provider value={{ currentGroup, setCurrentGroupId }}>
      {children}
    </CurrentGroupContext.Provider>
  );
}
