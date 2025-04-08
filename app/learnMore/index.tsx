import { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, SafeAreaView } from "react-native";
import { useRouter } from 'expo-router';
import images from "@/assets/images";
import { getHairLossInfo, getErectileDysfunctionInfo } from "@/i18n/helper";
import { useTranslation } from "react-i18next";
import { LearnMoreScreenData } from "@/types/screens";
import { getStylesheet } from "@/styles/learn-more.style";

export default function LearnMoreScreen() {
    const router = useRouter();
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(0);
    const [screens, setScreens] = useState<LearnMoreScreenData[]>([]);
    const styles = getStylesheet();

    useEffect(() => {
        const hairLossInfo = getHairLossInfo();
        const erectileDysfunctionInfo = getErectileDysfunctionInfo();
        const screensData = [
            {
                id: "01",
                info: hairLossInfo,
                image: images.learnMoreHairLoseImage,
                buttonText: t("home.nextBtn", "NEXT"),
                onButtonPress: () => setCurrentPage(1),
                imagePosition: "left",
            },
            {
                id: "02",
                info: erectileDysfunctionInfo,
                image: images.learnMoreErectileDisfunctionImage,
                buttonText: t("home.doneBtn", "DONE"),
                onButtonPress: () => router.replace("./"),
                imagePosition: "right",
            },
        ];

        setScreens(screensData);
    }, [t]);

    // Current screen data
    const currentScreen = screens[currentPage];

    if (!currentScreen) {
        return null;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                <View
                    style={[
                        styles.imageContainer,
                        currentScreen.imagePosition === "right" ? styles.imageContainerRight : styles.imageContainerLeft,
                    ]}
                >
                    <Image source={currentScreen.image} style={styles.image} resizeMode="cover" />
                    <Text
                        style={[
                            styles.overlayNumber,
                            currentScreen.imagePosition === "right" ? styles.overlayNumberRight : styles.overlayNumberLeft,
                        ]}
                    >
                        {currentScreen.id}
                    </Text>
                </View>

                <Text style={styles.categoryLabel}>{currentScreen.info?.header}</Text>

                <Text style={styles.title}>{currentScreen.info?.title}</Text>

                <Text style={styles.description}>{currentScreen.info?.subtitle}</Text>
            </View>

            {/* Button & page indicator container at bottom */}
            <View>
                <View style={styles.paginationContainer}>
                    {screens.map((_, index) => (
                        <View
                            key={index}
                            style={[styles.paginationDot, index === currentPage ? styles.activeDot : styles.inactiveDot]}
                        />
                    ))}
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.nextButton} onPress={currentScreen.onButtonPress}>
                        <Text style={styles.nextButtonText}>{currentScreen.buttonText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
