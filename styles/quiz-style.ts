import { StyleSheet, Dimensions, Platform } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const { width, height } = Dimensions.get("window")
const scale = Math.min(width, height) / 375

const responsiveFont = (size: number) => Math.round(size * scale)
const responsiveSize = (size: number) => Math.round(size * scale)

export const getStylesheet = () => {
    const insets = useSafeAreaInsets()

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#e6ede7",
            paddingTop: insets.top || responsiveSize(20),
            paddingBottom: insets.bottom || responsiveSize(20),
        },
        loadingContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: responsiveSize(20),
        },
        loadingText: {
            marginTop: responsiveSize(16),
            fontSize: responsiveFont(16),
            color: "#0B3B3C",
        },
        errorText: {
            fontSize: responsiveFont(18),
            color: "#8B1A1A",
            marginBottom: responsiveSize(20),
        },
        retryButton: {
            backgroundColor: "#0B3B3C",
            paddingVertical: responsiveSize(12),
            paddingHorizontal: responsiveSize(24),
            borderRadius: responsiveSize(30),
        },
        retryButtonText: {
            color: "white",
            fontSize: responsiveFont(16),
            fontWeight: "600",
        },
        header: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: responsiveSize(10)
        },
        backButton: {
            padding: responsiveSize(8),
            width: responsiveSize(40),
            alignItems: "center",
            justifyContent: "center",
        },
        headerTitle: {
            fontSize: responsiveFont(18),
            fontWeight: "500",
            color: "#0B3B3C",
            textAlign: "center",
            flex: 1,
        },
        placeholder: {
            width: responsiveSize(40),
        },
        content: {
            flexGrow: 1,
            paddingHorizontal: responsiveSize(20),
            paddingTop: responsiveSize(80),
            paddingBottom: responsiveSize(20),
        },
        title: {
            fontSize: responsiveFont(24),
            fontWeight: "600",
            color: "#0B3B3C",
            textAlign: "center",
            marginBottom: responsiveSize(40),
        },
        patternsGrid: {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: responsiveSize(16),
        },
        patternItem: {
            width: responsiveSize(100),
            height: responsiveSize(100),
            justifyContent: "center",
            alignItems: "center",
            borderRadius: responsiveSize(16),
            marginBottom: responsiveSize(16),
            backgroundColor: "#f5f8f5",
            borderWidth: 1,
            borderColor: "#d1dfd1",
        },
        selectedPattern: {
            backgroundColor: "rgba(169, 190, 169, 0.5)",
        },
        patternImage: {
            width: responsiveSize(80),
            height: responsiveSize(80),
        },
        optionsContainer: {
            width: "100%",
            alignItems: "center",
        },
        optionButton: {
            borderWidth: 1,
            borderColor: "#A5B79F",
            borderRadius: responsiveSize(8),
            padding: responsiveSize(16),
            marginBottom: responsiveSize(16),
            width: "100%",
            alignItems: "center",
        },
        selectedOption: {
            backgroundColor: "rgba(169, 190, 169, 0.5)",
        },
        optionText: {
            fontSize: responsiveFont(16),
            fontWeight: "600",
            color: "#0B3B3C",
        },
        footer: {
            paddingHorizontal: responsiveSize(20),
        },
        nextButton: {
            backgroundColor: "#0B3B3C",
            borderRadius: responsiveSize(30),
            paddingVertical: responsiveSize(16),
            alignItems: "center",
            justifyContent: "center",
        },
        nextButtonDisabled: {
            opacity: 0.3,
        },
        nextButtonText: {
            color: "white",
            fontSize: responsiveFont(16),
            fontWeight: "400",
            letterSpacing: 1,
        },
        nextButtonTextDisabled: {
            color: "rgba(255, 255, 255, 0.7)",
        },
    })
}
