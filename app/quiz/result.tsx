import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Linking } from "react-native"
import { useLocalSearchParams, useRouter, useNavigation } from 'expo-router'
import { getRejectionMessage } from "@/i18n/helper"
import { useEffect } from "react"
import { getStylesheet } from "@/styles/result.style";

export default function QuizResult() {
    const router = useRouter()
    const navigation = useNavigation()
    const params = useLocalSearchParams()
    const styles = getStylesheet()

    const isRejection = params.isRejection === 'true'
    let rejectionMessage;

    if (isRejection) {
        rejectionMessage = getRejectionMessage();
    }

    useEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation])

    const handleOk = () => {
        // Navigate to home
        router.replace("/");
    };

    const handleLinkPress = () => {
        Linking.openURL("https://www.manual.co");
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.placeholder} />
                <Text style={styles.headerTitle}>Quiz</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {isRejection ? (
                    <Text style={styles.message}>
                        {rejectionMessage}
                    </Text>
                ) : (
                    <Text style={styles.message}>
                        Great news! We have the perfect treatment for your hair loss. Proceed to{" "}
                        <Text style={styles.link} onPress={handleLinkPress}>
                            www.manual.co
                        </Text>
                        , and prepare to say hello to your new hair!
                    </Text>
                )}
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.okButton} onPress={handleOk}>
                    <Text style={styles.okButtonText}>OK</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

