import { Stack } from 'expo-router';
import {useTranslation} from "react-i18next";

export default function QuizLayout() {
    const { t } = useTranslation();

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#e6ede7' },
            }}
        >
            <Stack.Screen name="index" />
            <Stack.Screen
                name="question/[id]"
                options={{
                    presentation: 'modal',
                    animation: 'slide_from_right',
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="result"
                options={{
                    presentation: 'modal',
                    animation: 'slide_from_right',
                    headerShown: true,
                    title: t('questions.pageTitle', 'Quiz'),
                    headerStyle: { backgroundColor: '#e6ede7' },
                    headerBlurEffect: "none",
                    headerTitleAlign: 'center',
                    headerShadowVisible: false,
                    headerTitleStyle: { fontSize: 18, fontWeight: '500' },
                }}
            />
        </Stack>
    );
}
