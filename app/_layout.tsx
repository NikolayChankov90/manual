import {Stack} from 'expo-router';
import AppLoader from "@/components/AppLoader";

export default function RootLayout() {
    return (
        <AppLoader>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="learnMore"/>
                <Stack.Screen name="quiz" />
            </Stack>
        </AppLoader>
    );
}
