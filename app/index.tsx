import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import images from "@/assets/images";
import { useTranslation } from "react-i18next";
import { stylesheet } from '@/styles/home.style';

export default function HomeScreen() {
    const router = useRouter();
    const styles = stylesheet;
    const { t } = useTranslation();
    const handleTakeQuiz = () => {
        router.push("/quiz");
    }

    const handleLearnMore = () => {
        router.push("/learnMore");
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={images.brandLogo}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.content}>
                <View style={styles.textContainer}>
                    <Text style={styles.heading}>{t("home.title", "Be good to yourself")}</Text>
                    <Text style={styles.subheading}>{t("home.subtitle", "We're working around the clock to bring you a holistic approach to your wellness. From top to bottom, inside and out.")}</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.learnMoreButton} onPress={handleLearnMore}>
                        <Text style={styles.learnMoreText}>{t("home.learnMoreBtn")}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.quizButton} onPress={handleTakeQuiz}>
                        <Text style={styles.quizButtonText}>{t("home.takeQuizBtn")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
