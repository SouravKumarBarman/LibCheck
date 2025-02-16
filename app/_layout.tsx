import {Slot, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUserRole = async () => {
      const role = await AsyncStorage.getItem('userRole');
      setUserRole(role);
      setLoading(false);
      if (role) {
        router.replace(`/${role}`);
      }
    };
    checkUserRole();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <Slot />
    </>
  );
}
