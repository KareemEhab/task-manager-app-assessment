import { StyleSheet } from "react-native";

import {
  BrandColors,
  CommonColors,
  DarkColors,
  LightColors,
  TextColors,
} from "@/constants/theme";

export const getCategoriesInputStyles = (
  isDark: boolean,
  isFilled: boolean,
  hasError: boolean
) =>
  StyleSheet.create({
    container: {
      marginBottom: 6,
    },
    label: {
      fontSize: 14,
      fontWeight: "500",
      color: isDark ? DarkColors.dark4 : TextColors.primary,
      marginBottom: 8,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    inputWrapper: {
      flex: 1,
      height: 52,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 16,
      paddingBottom: 16,
      borderWidth: 1,
      borderColor: hasError
        ? CommonColors.error
        : isFilled
          ? BrandColors.main
          : isDark
            ? DarkColors.dark3
            : LightColors.light1,
      borderRadius: 12,
      backgroundColor: isDark
        ? DarkColors.darkText
        : isFilled
          ? LightColors.light3
          : "transparent",
    },
    input: {
      flex: 1,
      paddingLeft: 0, // Padding handled by wrapper View
      paddingRight: 0, // Padding handled by wrapper View
      paddingTop: 0, // Padding handled by wrapper View
      paddingBottom: 0, // Padding handled by wrapper View
      fontSize: 16,
      lineHeight: 20, // Ensure consistent line height for text alignment
      color: isDark ? CommonColors.white : TextColors.primary,
      backgroundColor: "transparent", // Transparent since wrapper handles background
    },
    inputFilled: {
      backgroundColor: isDark ? DarkColors.darkText : LightColors.light3,
      borderColor: BrandColors.main,
    },
    inputError: {
      borderColor: CommonColors.error,
    },
    addButton: {
      width: 44,
      height: 44,
      borderRadius: 12,
      backgroundColor: isDark ? DarkColors.darkBorder : LightColors.light2,
      alignItems: "center",
      justifyContent: "center",
    },
    categoriesContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginTop: 12,
    },
    errorText: {
      fontSize: 12,
      color: CommonColors.error,
      marginTop: 4,
    },
  });


