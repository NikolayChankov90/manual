import {router, Stack} from 'expo-router';
import {useTranslation} from "react-i18next";
import {TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";

export default function LearnMoreLayout() {
    const { t } = useTranslation();

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#e6ede7' },
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    headerShown: true,
                    title: t('learnMore.pageTitle', 'What can we help with'),
                    headerStyle: { backgroundColor: '#e6ede7'  },
                    headerBlurEffect: "none",
                    headerTitleAlign: 'center',
                    headerShadowVisible: false,
                    headerTitleStyle: { fontSize: 18, fontWeight: '500', fontFamily: 'TTNorms Medium' },
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()} style={{ paddingHorizontal: 10 }}>
                            <Ionicons name="close" style={{cursor: 'pointer'}} size={24} color="#000" />
                        </TouchableOpacity>
                    )

                }}
            />
        </Stack>
    );
}
