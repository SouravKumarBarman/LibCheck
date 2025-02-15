import { Stack,Link } from "expo-router";
import { View, StyleSheet } from "react-native";

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: 'Oops! Not Found' }} />
            <View >
                <Link href="/" >
                    Go back to Home screen!
                </Link>
            </View>
        </>
    );
}