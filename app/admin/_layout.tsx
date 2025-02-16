import { useEffect, useState } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

export default function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('adminToken');
      setIsAuthenticated(!!token);
      setLoading(false);
      
      if (!token && segments[1] !== 'signin') {
        router.replace('/admin/signin');
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}
