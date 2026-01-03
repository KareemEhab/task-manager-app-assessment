import { StyleSheet } from "react-native";

import {
  BrandColors,
  CommonColors,
  DarkColors,
  LightColors,
  TextColors,
} from "@/constants/theme";

export const getButtonStyles = (isDark: boolean) =>
  StyleSheet.create({
    base: {
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      minHeight: 52,
    },
    primary: {
      backgroundColor: BrandColors.main,
    },
    primaryTransparent: {
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: BrandColors.main,
    },
    danger: {
      backgroundColor: CommonColors.error,
    },
    cancel: {
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: isDark ? DarkColors.dark4 : LightColors.lightBorder,
    },
    disabled: {
      opacity: 0.5,
    },
    pressed: {
      opacity: 0.8,
    },
    text: {
      fontSize: 16,
      fontWeight: "600",
    },
    primaryText: {
      color: CommonColors.white,
    },
    primaryTransparentText: {
      color: BrandColors.main,
      fontWeight: "600",
    },
    dangerText: {
      color: CommonColors.white,
    },
    cancelText: {
      fontWeight: "600",
      color: isDark ? CommonColors.white : TextColors.primary,
    },
  });

