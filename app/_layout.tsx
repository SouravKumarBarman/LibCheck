import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { AuthProvider } from "@/context/AuthContext";

const AppLayout = () => {
  const { authState } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (authState?.authenticated === true && authState?.role === 'admin') {
      router.replace('/admin');
    } else if (authState?.authenticated === true && authState?.role === 'user') {
      router.replace('/user');
    }
  }, [authState]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="adminSignin"/>
      <Stack.Screen name="userSignin"/>
      <Stack.Screen name="admin" />
      <Stack.Screen name="user" />
    </Stack>
  );
}

export default function RootLayout() {

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <AppLayout />
    </SafeAreaProvider>
    </AuthProvider>
  );
}
