import {Dimensions, StyleSheet} from "react-native"
import { getDeviceInfo, getScaleFunctions, getSpacing } from "@/app/utils/responsive"

const { width, height } = Dimensions.get("window")
const scale = Math.min(width, height) / 375

const responsiveSize = (size: number) => Math.round(size * scale)

export const getStylesheet = () => {
    const deviceInfo = getDeviceInfo()
    const { scale, verticalScale, fontScale } = getScaleFunctions()
    const spacing = getSpacing()
    const { isIOS, isSmallDevice, hasNotch } = deviceInfo

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#e6ede7",
        },
        header: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.md,
            marginTop: isIOS ? spacing.sm : spacing.xs,
        },
        placeholder: {
            width: scale(24),
        },
        headerTitle: {
            fontSize: fontScale(18),
            fontWeight: "500",
            color: "#0B3B3C",
            textAlign: "center",
        },
        content: {
            flexGrow: 1,
            paddingHorizontal: spacing.lg,
            paddingTop: spacing.lg,
            paddingBottom: spacing.lg,
            justifyContent: "center",
        },
        message: {
            fontSize: fontScale(22),
            lineHeight: fontScale(32),
            color: "#0B3B3C",
            flexWrap: "nowrap",
            marginBottom: spacing.xxl,
            fontWeight: "400",
            letterSpacing: isSmallDevice ? -0.3 : -0.5,
        },
        link: {
            color: "#a9bea9",
            textDecorationLine: "underline",
            cursor: "pointer"
        },
        footer: {
            padding: spacing.md,
            paddingBottom: hasNotch ? spacing.xl : spacing.lg,
        },
        okButton: {
            backgroundColor: "#0B3B3C",
            borderRadius: 100,
            paddingVertical: responsiveSize(16),
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
        },
        okButtonText: {
            fontSize: fontScale(16),
            fontWeight: "600",
            textTransform: "uppercase",
            color: "white",
            letterSpacing: 1,
        },
    })
}
