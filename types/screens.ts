import { InfoDataObj } from './types';

/**
 * Represents data for a screen in the learn more section
 */
export type LearnMoreScreenData = {
    id: string;
    info: InfoDataObj | undefined;
    image: any;
    buttonText: any;
    onButtonPress: () => void;
    imagePosition: string;
};
