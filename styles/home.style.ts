import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');

export const stylesheet = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A5B79F',
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'space-between',
        paddingVertical: 26,
    },
    logoContainer: {
        alignItems: 'center',
        textAlign: "center",
        justifyContent: "space-between"

    },
    logo: {
        width:172,
        height: 172,
        marginTop: 80,
    },
    textContainer: {
        alignItems: 'center',
    },
    heading: {
        textAlign: 'center',
        marginBottom: 16,
        width: 311,
        height: 160,
        fontFamily: 'TTNorms-Medium',
        fontWeight: '500',
        fontSize: 65,
        lineHeight: 80,
        letterSpacing: -0.03,
        color: '#0B3B3C',
    },
    subheading: {
        color: '#0B3B3C', // Dark teal color for text textAlign: 'center',
        fontWeight: 400,
        fontSize: 19,
        lineHeight: 30,
        letterSpacing: 0,
        gap: 10,
        textAlign: "center",
    },
    learnMoreButton: {
        alignSelf: 'center',
        lineHeight: 30,
        cursor: "pointer"
    },
    learnMoreText: {
        fontSize: 16,
        marginBottom: 0,
        color: '#0B3B3C', // Dark teal color for text
        textDecorationLine: 'underline',
        fontWeight: '400',
    },
    quizButton: {
        backgroundColor: '#7E0707', // Dark red color for button
        borderRadius: 100,
        paddingVertical: 16,
        width: width - 48, // Full width minus padding
        height: 60,
        alignItems: 'center',
        marginTop: 20,
        cursor: "pointer"
    },
    quizButtonText: {
        color: 'white',
        fontSize: 16,
    },
});
