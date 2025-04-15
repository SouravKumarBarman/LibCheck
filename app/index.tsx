import { View, Text, Button, StyleSheet, Pressable, StatusBar } from 'react-native';
import { Link } from 'expo-router';
import "@/global.css"
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Index() {

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <SafeAreaView style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={styles.title}>LibCheck</Text>


        {/* Admin button */}
        <Link href="/adminSignin" asChild style={styles.button1}>
          <Pressable>
            <Text style={{ fontSize: 38, color: "white" }}>Admin</Text>
          </Pressable>
        </Link>


        {/* User button */}
        <Link href="/userSignin" asChild style={styles.button2}>
          <Pressable>
            <Text style={{ fontSize: 38 }}>User</Text>
          </Pressable>
        </Link>
      </SafeAreaView>
    </>

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
