import { Stack } from 'expo-router';

export default function searchingLayout() {
    return (
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: '#000000',
            },
            headerShadowVisible: false,
            headerTintColor: '#fff'
        }}>
            <Stack.Screen name="index" options={{ title: "Search" }} />
            <Stack.Screen name="search" options={{ headerShown: false }} />
        </Stack>
    )
}