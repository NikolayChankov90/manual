import { StyleSheet, Dimensions, Platform } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

// Get screen dimensions
const { width, height } = Dimensions.get("window")

// Calculate responsive sizes
const scale = Math.min(width, height) / 375 // Base scale on iPhone 8 size
const responsiveFont = (size: any) => Math.round(size * scale)
const responsiveSize = (size: any) => Math.round(size * scale)

export const getStylesheet = () => {
    const insets = useSafeAreaInsets()

    return StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "column",
            backgroundColor: "#e6ede7",
            paddingTop: insets.top > 0 ? insets.top : responsiveSize(20),
            paddingBottom: insets.bottom > 0 ? insets.bottom : responsiveSize(20),
            paddingHorizontal: responsiveSize(20),
            justifyContent: "space-between", // This ensures proper spacing
        },
        headerContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: responsiveSize(20),
            position: "relative", // For absolute positioning of close button
            paddingTop: responsiveSize(10),
        },
        closeButton: {
            position: "absolute",
            left: 0,
            top: responsiveSize(10),
            zIndex: 10,
        },
        headerText: {
            fontSize: responsiveFont(24),
            fontWeight: "600",
            color: "#0B3B3C",
            textAlign: "center",
            flex: 1,
        },
        contentContainer: {
            flex: 1,
            justifyContent: "center",
        },
        imageContainer: {
            position: "relative",
            width: width * 0.45, // Slightly smaller on smaller screens
            height: width * 0.45,
            marginBottom: responsiveSize(25),
            maxWidth: 250,
            maxHeight: 250,
        },
        image: {
            width: "100%",
            height: "100%",
            borderRadius: responsiveSize(15),
            zIndex: 2
        },
        overlayNumber: {
            position: "absolute",
            fontWeight: 600,
            color: "rgba(255, 255, 255, 0.8)",

        },
        categoryLabel: {
            fontSize: responsiveFont(12), // Smaller font size for category
            color: "#0B3B3C",
            letterSpacing: 1,
            marginBottom: responsiveSize(8),
            textTransform: "uppercase", // Ensure uppercase display
        },
        title: {
            fontSize: responsiveFont(23),
            fontWeight: 500,
            color: "#0B3B3C",
            marginBottom: responsiveSize(16),
            lineHeight: responsiveFont(34),
        },
        description: {
            fontSize: responsiveFont(16),
            color: "#0B3B3C",
            lineHeight: responsiveFont(24),
            marginBottom: responsiveSize(30),


        },
        paginationContainer: {
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: responsiveSize(25),
        },
        paginationDot: {
            width: responsiveSize(8),
            height: responsiveSize(8),
            borderRadius: responsiveSize(4),
            marginHorizontal: responsiveSize(4),
        },
        activeDot: {
            backgroundColor: "#0B3B3C",
        },
        inactiveDot: {
            backgroundColor: "#A9BEA9",
        },
        buttonContainer: {
            width: "100%",
            marginTop: "auto", // Push to bottom of container
        },
        nextButton: {
            backgroundColor: "#0B3B3C",
            borderRadius: responsiveSize(30),
            paddingVertical: responsiveSize(16),
            alignItems: "center",
            justifyContent: "center",
        },
        nextButtonText: {
            color: "white",
            fontSize: responsiveFont(16),
            fontWeight: "600",
            letterSpacing: 1,
        },
        imageContainerLeft: {
            alignSelf: "flex-start",
        },
        imageContainerRight: {
            alignSelf: "flex-end",
            marginRight: width * 0.05,
        },
        overlayNumberLeft: {
            right: -width * 0.25, // Adjusted to be closer to the image
            top: responsiveSize(10), // Position from top
            fontSize: responsiveFont(120), // Slightly smaller font
            alignSelf: "flex-end",
            left: "auto",
        },
        overlayNumberRight: {
            left: -width * 0.25, // Adjusted to be closer to the image
            top: responsiveSize(10), // Position from top
            fontSize: responsiveFont(120), // Slightly smaller font
            alignSelf: "flex-end",
            right: "auto",
        },
        // Add responsive styles for different screen sizes
        ...Platform.select({
            ios: {
                // iOS specific adjustments
                overlayNumber: {
                    position: "absolute",
                    top: responsiveSize(20),
                    fontSize: responsiveFont(100),
                    fontWeight: "bold",
                    color: "rgba(255, 255, 255, 0.8)",
                    opacity: 0.8,
                    zIndex: 1,
                },
            },
            android: {
                // Android specific adjustments
                overlayNumber: {
                    position: "absolute",
                    top: responsiveSize(15),
                    fontSize: responsiveFont(95),
                    fontWeight: "bold",
                    color: "rgba(255, 255, 255, 0.8)",
                    opacity: 0.8,
                    zIndex: 1,
                },
            },
        }),
    })
}

// For components that can't use hooks, provide a static version
export const stylesheet = StyleSheet.create({
    // Static styles remain the same...
    container: {
        flex: 1,
        backgroundColor: "#e6ede7",
        padding: responsiveSize(20),
        justifyContent: "space-between",
    },
    // ... rest of your static styles
})
