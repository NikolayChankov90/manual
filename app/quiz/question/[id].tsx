import { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useNavigation, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { getQuestions } from "@/i18n/helper";
import {getStylesheet} from "@/styles/quiz-style"

export default function QuizQuestionScreen() {
    const router = useRouter();
    const { t } = useTranslation();
    const params = useLocalSearchParams();
    const styles =  getStylesheet();

    // Get question ID from URL
    const questionId = params.id as string;
    const questionIndex = Number.parseInt(questionId, 10) || 0;

    const [questions, setQuestions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number | null }>({});
    const [initialLoadDone, setInitialLoadDone] = useState(false);

    // Parse previous answers from URL
    const answersParam = params.answers as string;
    const previousAnswers = answersParam ? JSON.parse(decodeURIComponent(answersParam)) : {};

    // Load questions
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setIsLoading(true);
                const loadedQuestions = await getQuestions();
                setQuestions(loadedQuestions);
            } catch (error) {
                console.error("Failed to load questions:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    // Set selected option from previous answers - ONLY ONCE
    useEffect(() => {
        if (!initialLoadDone && !isLoading && questions.length > 0) {
            if (previousAnswers[questionIndex] !== undefined) {
                setSelectedOptions((prevState) => ({
                    ...prevState,
                    [questionIndex]: previousAnswers[questionIndex].optionIndex,
                }));
            }
            setInitialLoadDone(true);
        }
    }, [questionIndex, previousAnswers, isLoading, questions, initialLoadDone]);

    // Get current question
    const currentQuestion = questions[questionIndex];

    // Memoize the option selection handler to prevent unnecessary re-renders
    const handleOptionSelect = useCallback((optionIndex: number) => {
        setSelectedOptions((prevState) => ({
            ...prevState,
            [questionIndex]: optionIndex,
        }));
    }, [questionIndex]);

    const handleNext = useCallback(() => {
        // Safety check for ensur we have a valid question and selected option
        if (!currentQuestion || selectedOptions[questionIndex] === null) {
            return;
        }

        const selectedOption = selectedOptions[questionIndex];

        // Safety check: ensure the selected option exists in the array
        if (!currentQuestion.options || selectedOption >= currentQuestion.options.length) {
            return;
        }

        const option = currentQuestion.options[selectedOption];

        // Safety check: ensure the option object has the needed properties
        if (!option) {
           return;
        }

        // Update answers with current selection
        const updatedAnswers = {
            ...previousAnswers,
            [questionIndex]: {
                optionIndex: selectedOption,
                value: option.value,
                isRejection: option.isRejection,
            },
        };

        // Encode answers for URL
        const encodedAnswers = encodeURIComponent(JSON.stringify(updatedAnswers));

        if (option.isRejection) {
            // If rejection, go to result
            router.push({
                pathname: "../result",
                params: { isRejection: "true", answers: encodedAnswers },
            });
        } else if (questionIndex < questions.length - 1) {
            // Go to next question
            router.push({
                pathname: `../question/${questionIndex + 1}`,
                params: { answers: encodedAnswers },
            });
        } else {
            // Last question, go to result
            router.push({
                pathname: "../result",
                params: { isRejection: "false", answers: encodedAnswers },
            });
        }
    }, [selectedOptions, router, questions.length]);

    const handleBack = useCallback(() => {
        if (questionIndex > 0) {
            router.push({
                pathname: `../question/${questionIndex - 1}`,
                params: { answers: answersParam },
            });
        } else {
            router.back();
        }
    }, [router, questionIndex]);

    // Check if the next button should be disabled
    const isNextButtonDisabled = useCallback(() => {
        return selectedOptions[questionIndex] == null;
    }, [selectedOptions, questionIndex]);

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0B3B3C" />
                    <Text style={styles.loadingText}>Loading questions...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (!currentQuestion) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <Text style={styles.errorText}>Question not found</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={() => router.push("/")}>
                        <Text style={styles.retryButtonText}>Go to Home</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#0B3B3C" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t("quiz.title", "Quiz")}</Text>
                <View style={styles.placeholder} />
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>{currentQuestion.question}</Text>

                {currentQuestion.type === "ChoiceTypeImage" && (
                    <View style={styles.patternsGrid}>
                        {currentQuestion.options.map((option: any, index: number) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.patternItem, selectedOptions[questionIndex] === index && styles.selectedPattern]}
                                onPress={() => handleOptionSelect(index)}
                                activeOpacity={0.7}
                            >
                                <Image source={{ uri: option.display }} style={styles.patternImage} resizeMode="contain" />
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {currentQuestion.type === "ChoiceTypeText" && (
                    <View style={styles.optionsContainer}>
                        {currentQuestion.options.map((option: any, index: number) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.optionButton, selectedOptions[questionIndex] === index && styles.selectedOption]}
                                onPress={() => handleOptionSelect(index)}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.optionText}>{option.display}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.nextButton, isNextButtonDisabled() && styles.nextButtonDisabled]}
                    onPress={handleNext}
                    disabled={isNextButtonDisabled()}
                >
                    <Text style={[styles.nextButtonText, isNextButtonDisabled() && styles.nextButtonTextDisabled]}>
                        {t("quiz.nextBtn", 'NEXT')}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
