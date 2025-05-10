import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
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
                    <Ionicons name={focused ? "search-sharp" : "search-outline"} color={color} size={24} />
                )
            }} />
        </Tabs>
    );
}
