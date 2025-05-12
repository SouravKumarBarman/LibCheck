import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from "@/context/AuthContext";


export default function TabLayout() {
    const { onLogout } = useAuth();
    const handleLogout = async () => {
        await onLogout();
      }
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#000000',
                height: 56

            },
            headerShadowVisible: false,
            headerTintColor: '#fff',
            tabBarStyle: {
                backgroundColor: '#000000',
            },
            tabBarHideOnKeyboard: true
        }}>
            <Tabs.Screen name="index" options={{
                title: 'Home',
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? "home-sharp" : "home-outline"} color={color} size={24} />
                ),
                headerRight: () => (
                    <Ionicons className='m-5' name="log-out-outline" size={24} color="white" onPress={handleLogout}/>
                )
            }} />
            <Tabs.Screen name="searching" options={{
                headerShown: false,
                title: 'Search',
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? "search-sharp" : "search-outline"} color={color} size={24} />
                )
            }} />
            <Tabs.Screen name="borrowRecord" options={{
                title: 'Borrow Record',
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? "reader-sharp" : "reader-outline"} color={color} size={24} />
                )
            }} />
        </Tabs>
    );
}
