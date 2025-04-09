import { StyleSheet, Dimensions, Platform } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

// Get screen dimensions
const { width, height } = Dimensions.get("window")

// Calculate responsive sizes
const scale = Math.min(width, height) / 375 // Base scale on iPhone 8 size
const responsiveFont = (size: number) => Math.round(size * scale)
const responsiveSize = (size: number) => Math.round(size * scale)

export const getHomeStyles = () => {
    const insets = useSafeAreaInsets()

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#A5B79F",
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
        },
        content: {
            flex: 1,
            paddingHorizontal: responsiveSize(24),
            justifyContent: "space-between",
            textAlign: "center",
        },
        logo: {
            marginTop: height * 0.07, // Increased top margin
            marginBottom: height * 0.04, // Added bottom margin
            width: responsiveSize(172),
            height: responsiveSize(172),
            alignSelf: "center"
        },
        textContainer: {
            flexWrap: "nowrap",
            width: "100%",
        },
        contentWrapper: {
            width: "100%",
            maxWidth: responsiveSize(366),
            alignSelf: "center", // centers the whole block while text stays left-aligned
        },
        heading: {
            width: "100%",
            color: "#0B3B3C",
            textAlign: "center",
            marginBottom: responsiveSize(10),
            fontFamily: "TTNorms-Medium",
            fontWeight: "500",
            fontSize: Platform.OS === "ios" ? responsiveFont(48) : responsiveFont(46),
            lineHeight: Platform.OS === "ios" ? responsiveFont(58) : responsiveFont(56),
        },
        subheading: {
            width: "100%",
            textAlign: "center",
            color: "#0B3B3C",
            fontWeight: "400",
            fontSize: responsiveFont(16),
            lineHeight: responsiveFont(24),
            marginBottom: responsiveSize(40),
        },
        buttonContainer: {
            width: "100%",
            alignItems: "center",
            marginBottom: insets.bottom > 0 ? responsiveSize(10) : responsiveSize(30),
        },
        learnMoreButton: {
            marginBottom: responsiveSize(20),
        },
        learnMoreText: {
            fontSize: responsiveFont(16),
            color: "#0B3B3C",
            textDecorationLine: "underline",
            fontWeight: "500",
            textTransform: "uppercase",
        },
        quizButton: {
            backgroundColor: "#7E0707",
            borderRadius: 100,
            paddingVertical: responsiveSize(16),
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
        },
        quizButtonText: {
            color: "white",
            fontSize: responsiveFont(16),
            fontWeight: "600",
            textTransform: "uppercase",
        },
        // Platform-specific adjustments
        ...Platform.select({
            ios: {
            },
            android: {
            },
        }),
    })
}

