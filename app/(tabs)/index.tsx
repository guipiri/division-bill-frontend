import divisionBillImage from '@/assets/images/pink-floyd-the-division-bell.jpg';
import { Colors } from '@/constants/colors';
import { AuthContext } from '@/contexts/AuthContext';
import { Group } from '@/types/Group';
import { FontAwesome } from '@expo/vector-icons';
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
import { _getGroupsByUserId } from './actions';

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
      <Pressable
        style={{
          alignSelf: 'flex-end',
          bottom: 36,
          right: 36,
          position: 'absolute',
        }}
        onPress={() => router.push('/group/create')}
      >
        <FontAwesome name="plus-circle" size={56} color={Colors.Green} />
      </Pressable>
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
