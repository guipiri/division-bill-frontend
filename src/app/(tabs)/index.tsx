import { _getGroupsByUserId } from '@/src/actions';
import divisionBillImage from '@/src/assets/images/pink-floyd-the-division-bell.jpg';
import { MainActionButton } from '@/src/components/MainActionButton';
import { Colors } from '@/src/constants/colors';
import { AuthContext } from '@/src/contexts/Auth';
import { Group } from '@/src/types/Group';
import { Link, router } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function ListGroupsScreen() {
  const [groups, setGroups] = useState<Group[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;
    _getGroupsByUserId(user?.id, setGroups);
  }, [user]);

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: '100%', padding: 20 }}>
        {groups.map((group, index) => {
          return (
            <View
              key={group.id}
              style={{
                backgroundColor: 'transparent',
                marginBottom: index + 1 === groups.length ? 40 : 10,
                borderRadius: 5,
              }}
            >
              <Link href={`/group/expenses/${group.id}`} asChild>
                <Pressable>
                  <View
                    style={{
                      flexDirection: 'row',
                      height: 140,
                      alignItems: 'center',
                    }}
                  >
                    <View
                      style={{
                        width: 130,
                        height: '100%',
                        marginRight: 20,
                      }}
                    >
                      <Image
                        source={divisionBillImage}
                        style={{ width: 130, height: '100%', borderRadius: 5 }}
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          color: Colors.Foreground,
                          fontSize: 20,
                          width: 200,
                        }}
                      >
                        {group.name}
                      </Text>
                      <Text
                        style={{
                          color: Colors.Foreground,
                          width: 200,
                          marginTop: 10,
                        }}
                      >
                        {group.status === 'CLOSED'
                          ? 'dívidas quitadas!'
                          : 'aqui ainda há dívidas!'}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              </Link>
            </View>
          );
        })}
      </ScrollView>
      <MainActionButton.Root
        action={() => {
          router.push('/group/create-group');
        }}
      >
        <MainActionButton.Icon />
      </MainActionButton.Root>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.Backgroud,
  },
});
