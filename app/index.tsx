"use client"
import { View, Text, TouchableOpacity, SafeAreaView, Image, StatusBar } from "react-native"
import { useRouter } from "expo-router"
import images from "@/assets/images"
import { useTranslation } from "react-i18next"
import { getHomeStyles } from "@/styles/home.style"
import {getSubtitleMessage} from "@/i18n/helper";

export default function Index() {
    const router = useRouter()
    const styles = getHomeStyles() // Use the hook-based styles
    const { t } = useTranslation()
    const subtitleMessage = getSubtitleMessage();

    const handleTakeQuiz = () => {
        router.push("/quiz")
    }

    const handleLearnMore = () => {
        router.push("/learnMore")
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.contentWrapper}>
                    <Image
                        source={images.brandLogo}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.heading}>{t("home.title")}</Text>
                        <Text style={styles.subheading}>
                            {t(
                                "home.subtitle",
                                {subtitleMessage},
                            )}
                        </Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.learnMoreButton} onPress={handleLearnMore}>
                        <Text style={styles.learnMoreText}>{t("home.learnMoreBtn", "LEARN MORE")}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.quizButton} onPress={handleTakeQuiz}>
                        <Text style={styles.quizButtonText}>{t("home.takeQuizBtn", "TAKE THE QUIZ")}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}
