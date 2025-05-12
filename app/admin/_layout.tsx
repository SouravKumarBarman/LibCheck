import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from "@/context/AuthContext";

export default function TabLayout() {
    const { onLogout } = useAuth();
    const handleSignOut = async () => {
    await onLogout();
  };
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#000000',

            },
            headerShadowVisible: false,
            headerTintColor: '#fff',
            tabBarStyle: {
                backgroundColor: '#000000',
            }
        }}>
            <Tabs.Screen name="index" options={{
                title: 'Add Books',
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? "home-sharp" : "home-outline"} color={color} size={24} />
                ),
                headerRight: () => (
                    <Ionicons className='m-5' name="log-out-outline" size={24} color="white" onPress={handleSignOut}/>
                )
            }} />
            <Tabs.Screen name="(tabs)/search" options={{
                title: 'Search',
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? "search-sharp" : "search-outline"} color={color} size={24} />
                )
            }} />
            <Tabs.Screen name="returnBook" options={{
                title: 'Return Book',
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? "receipt-sharp" : "receipt-outline"} color={color} size={24} />
                )
            }} />
        </Tabs>
    );
}
