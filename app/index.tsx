import { View, Text, Button, StyleSheet, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, Link } from 'expo-router';

export default function Index() {
  const router = useRouter();

  const selectRole = async (role: string) => {
    await AsyncStorage.setItem('userRole', role);
    router.replace(`/?${role}`);
  };

  return (
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      <Text style={styles.title}>LibCheck</Text>
      <Link href="/admin" asChild style={styles.button1}>
        <Pressable>
          <Text style={{ fontSize: 38 , color: "white"}}>Admin</Text>
        </Pressable>
      </Link>
      <Link href="/user" asChild style={styles.button2}>
        <Pressable>
          <Text style={{ fontSize: 38 }}>User</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingVertical: 100,
  },
  button1: {
    backgroundColor: 'black',
    borderRadius: 12,
    width: "70%",
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2: {
    margin: 20,
    borderBlockColor: 'black',
    borderWidth: 3,
    borderRadius: 12,
    width: "70%",
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
