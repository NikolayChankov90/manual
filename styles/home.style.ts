import { StyleSheet, Dimensions, Platform } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

// Get screen dimensions
const { width, height } = Dimensions.get("window")

// Calculate responsive sizes
const scale = Math.min(width, height) / 375 // Base scale on iPhone 8 size
const responsiveFont = (size: number) => Math.round(size * scale)
const responsiveSize = (size: number) => Math.round(size * scale)

// Hook-based version for components that can use hooks
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
            alignItems: "center",
        },
        logo: {
            marginTop: height * 0.08, // Increased top margin
            marginBottom: height * 0.04, // Added bottom margin
            width: responsiveSize(172),
            height: responsiveSize(172),
        },
        textContainer: {
            alignItems: "center",
        },
        heading: {
            textAlign: "center",
            marginBottom: responsiveSize(24), // Increased margin between heading and subheading
            fontFamily: "TTNorms-Medium",
            fontWeight: "500",
            fontSize: responsiveFont(42), // Keep the 42 font size
            lineHeight: responsiveFont(40), // Adjusted line height for better spacing
            letterSpacing: -0.5,
            color: "#0B3B3C",
            width: 311,
            height: 160,
        },
        subheading: {
            color: "#0B3B3C",
            textAlign: "center",
            fontWeight: "400",
            fontSize: responsiveFont(16),
            lineHeight: responsiveFont(24),
            marginHorizontal: responsiveSize(20),
            marginBottom: responsiveSize(40), // Increased bottom margin
            maxWidth: responsiveSize(366), // Match the width from your design (366)
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
                heading: {
                    fontFamily: "TTNorms-Medium",
                    fontWeight: "500",
                    fontSize: responsiveFont(48),
                    lineHeight: responsiveFont(58),
                },
            },
            android: {
                heading: {
                    fontFamily: "TTNorms-Medium",
                    fontWeight: "500",
                    fontSize: responsiveFont(46),
                    lineHeight: responsiveFont(56),
                },
            },
        }),
    })
}

