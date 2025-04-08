import { Dimensions, Platform, PixelRatio } from 'react-native'

const getWindowDimensions = () => {
    return Dimensions.get('window')
}

export const getDeviceInfo = () => {
    const { width, height } = getWindowDimensions()

    return {
        width,
        height,
        isIOS: Platform.OS === 'ios',
        isAndroid: Platform.OS === 'android',
        isSmallDevice: width < 375,
        isMediumDevice: width >= 375 && width < 414,
        isLargeDevice: width >= 414,
        isTablet: width >= 768,
        hasNotch: Platform.OS === 'ios' && height >= 812,
        isPortrait: height > width,
        isLandscape: width > height,
    }
}

export const getScaleFunctions = () => {
    const { width, height } = getWindowDimensions()
    const deviceInfo = getDeviceInfo()
    const baseWidth = 375
    const baseHeight = 812

    // Scale factors
    const widthScale = width / baseWidth
    const heightScale = height / baseHeight

    return {
        scale: (size: number) => width / baseWidth * size,
        verticalScale: (size: number) => height / baseHeight * size,
        fontScale: (size: number) => {
            const newSize = size * widthScale
            if (deviceInfo.isTablet) {
                // Smaller scaling for tablets to avoid too large fonts
                return Math.round(PixelRatio.roundToNearestPixel(size * 1.15))
            }
            return Math.round(PixelRatio.roundToNearestPixel(newSize))
        },
        moderateScale: (size: number, factor = 0.5) => size + (widthScale - 1) * size * factor,
    }
}

export const getSpacing = () => {
    const { scale } = getScaleFunctions()

    return {
        xs: scale(4),
        sm: scale(8),
        md: scale(16),
        lg: scale(24),
        xl: scale(32),
        xxl: scale(40),
    }
}

export const getResponsiveValues = () => {
    const { scale } = getScaleFunctions()
    const { width } = getDeviceInfo()

    return {
        // Font sizes
        fontSizes: {
            xs: scale(12),
            sm: scale(14),
            md: scale(16),
            lg: scale(18),
            xl: scale(20),
            xxl: scale(24),
            xxxl: scale(32),
            display: 65 * (width < 375 ? 0.8 : width > 414 ? 1.2 : 1),
        },

        // Spacing
        spacing: {
            xs: scale(4),
            sm: scale(8),
            md: scale(16),
            lg: scale(24),
            xl: scale(32),
            xxl: scale(40),
        },

        // Line heights
        lineHeights: {
            xs: scale(16),
            sm: scale(20),
            md: scale(24),
            lg: scale(30),
            xl: scale(40),
            xxl: 80 * (width < 375 ? 0.8 : width > 414 ? 1.2 : 1),
        },

        // Border radius
        borderRadius: {
            sm: scale(4),
            md: scale(8),
            lg: scale(16),
            xl: scale(30),
            full: 100,
        },
    }
}
