import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function AdminSignIn() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignIn = async () => {
    const ADMIN_PASSWORD = 'admin123'; // Replace with a real authentication system
    if (password === ADMIN_PASSWORD) {
      //await AsyncStorage.setItem('adminToken', 'authenticated');
      router.replace('/admin/(tabs)/addBooks');
    } else {
      Alert.alert('Invalid password', 'Please try again.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text>Admin Sign-In</Text>
      <TextInput
        placeholder="Enter Admin Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ width: 200, padding: 10, marginVertical: 10, borderWidth: 1, borderRadius: 5 }}
      />
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
}
