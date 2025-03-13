import { View, Text, Button, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function AdminHome() {
  const router = useRouter();

  const handleSignOut = async () => {
    await AsyncStorage.removeItem('adminToken');
    router.replace('/admin/signin');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Admin Home Screen</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
      <StatusBar barStyle={'light-content'} backgroundColor={"black"}/>
    </View>
  );
}
