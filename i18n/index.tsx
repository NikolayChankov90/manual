import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getLocales} from 'expo-localization';

// Function to load all translation files for a given language
const loadLanguageFiles = async (languageCode: string) => {
    let general, learnMore, quiz;

    try {
        // Dynamically import all translation files for the given language
        switch (languageCode) {
            case 'en':
                general = await import('./strings/en/general.json');
                learnMore = await import('./strings/en/learnMore.json');
                quiz = await import('./strings/en/quiz.json');
                break;
            default:
                general = await import('./strings/en/general.json');
                learnMore = await import('./strings/en/learnMore.json');
                quiz = await import('./strings/en/quiz.json');
        }

        // Returns a combined object of all translations for the language
        return {
            translation: general.default,
            learnMore: learnMore.default,
            quiz: quiz.default,
        };
    } catch (error) {
        console.error(`Failed to load translation files for ${languageCode}:`, error);
        return {
            translation: {},
            learnMore: {},
            quiz: {},
        };
    }
};

// Constants
const LANGUAGE_STORAGE_KEY = '@app:language';

// Helper function to get the default language
const getDefaultLanguage = () => {
    const locales = getLocales();
    return locales[0]?.languageCode ?? ''; // Default to the device language if available
};

// Initialize i18next
const initI18n = async () => {
    let storedLanguage;
    try {
        storedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    } catch (error) {
        console.error('Failed to get stored language:', error);
    }

    // Get the language (either stored or default)
    const language = storedLanguage || getDefaultLanguage();

    // Dynamically load the language resources
    const languageResources = await loadLanguageFiles(language);

    await i18n
        .use(initReactI18next)
        .init({
            resources: {
                [language]: languageResources,
            },
            lng: language,
            fallbackLng: 'en', // Fallback language if translation is not available
            compatibilityJSON: 'v4',
            load: 'currentOnly',
            returnObjects: true,
            lowerCaseLng: true,
            partialBundledLanguages: true,
            interpolation: {escapeValue: false},
            react: {useSuspense: false},
    });

    return i18n;
};

// Initialize i18n on app start
initI18n();

export default i18n;
