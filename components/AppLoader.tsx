import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useFonts } from 'expo-font';
import i18n from '@/i18n';

export function useAppReady() {
    const [isReady, setIsReady] = useState(false);
    const [fontsLoaded] = useFonts({
        'TTNorms-Medium': require('@/assets/fonts/TTNorms-Medium.otf'),
    });

    useEffect(() => {
        const checkReady = () => {
            if (fontsLoaded && i18n.isInitialized) {
                setIsReady(true);
            }
        };

        if (i18n.isInitialized) {
            checkReady();
        } else {
            i18n.on('initialized', checkReady);
            return () => i18n.off('initialized', checkReady);
        }
    }, [fontsLoaded]);

    return isReady;
}

export default function AppLoader({ children }: { children: React.ReactNode }) {
    const isReady = useAppReady();

    if (!isReady) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0B3B3C" />
            </View>
        );
    }

    return <>{children}</>;
}
