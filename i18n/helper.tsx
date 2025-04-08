import {InfoData, InfoDataObj, QuizData, QuizQuestion} from '@/types/types';
import i18n from 'i18next';

/**
 * Gets hair loss information from translations
 * @returns Hair loss info object or undefined if not found
 */
export function getHairLossInfo(): InfoDataObj | undefined {
    try {
        const learnMore = i18n?.options?.resources?.en?.learnMore as InfoData;
        return learnMore?.data.find(item => item.id === 1);
    } catch (error) {
        console.error('Failed to get hair loss info:', error);
        return undefined;
    }
}

/**
 * Gets erectile dysfunction information from translations
 * @returns Erectile dysfunction info object or undefined if not found
 */
export function getErectileDysfunctionInfo(): InfoDataObj | undefined {
    try {
        const learnMore = i18n?.options?.resources?.en?.learnMore as InfoData;
        return learnMore?.data.find(item => item.id === 2);
    } catch (error) {
        console.error('Failed to get erectile dysfunction info:', error);
        return undefined;
    }
}

/**
 * Gets quiz data from translations
 * @returns quiz data object or undefined if not found
 */
export function getQuizData(): QuizData | undefined {
    try {
        return i18n?.options?.resources?.en.quiz as QuizData;
    } catch (error) {
        console.error('Failed to get quiz data:', error);
        return undefined;
    }
}

/**
 * Gets all quiz questions
 * @returns Array of quiz questions or empty array if not found
 */
export async function getQuestions(): Promise<QuizQuestion[]> {
    try {
        const quizData = await getQuizData();
        console.warn('getQuestions', quizData);
        return quizData?.questions || [];
    } catch (error) {
        console.error('Failed to get questions:', error);
        return [];
    }
}

/**
 * Gets the rejection message
 * @returns Rejection message string or default message if not found
 */
export function getRejectionMessage(): string | undefined {
    try {
        return "Unfortunately, we are unable to prescribe this medication for you. This\n" +
            "is because finasteride can alter the PSA levels, which may be used to monitor for\n" +
            "cancer. You should discuss this further with your GP or specialist if you would still like\n" +
            "this medication.";
    } catch (error) {
        console.error('Failed to get success message:', error);
    }
}

