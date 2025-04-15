import { View, Text, Button, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useAuth } from "@/context/AuthContext";


export default function AdminHome() {
  const {onLogout}=useAuth();

  const handleSignOut = async () => {
    await onLogout();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Admin Home Screen</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
      <StatusBar barStyle={'light-content'} backgroundColor={"black"}/>
    </View>
  );
}
