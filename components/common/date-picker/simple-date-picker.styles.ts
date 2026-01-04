import { Platform, StyleSheet } from "react-native";

import {
  CommonColors,
  DarkColors,
  LightColors,
  TextColors,
} from "@/constants/theme";

export const getSimpleDatePickerStyles = (
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
      justifyContent: "space-between",
      height: 52,
      backgroundColor: isDark
        ? DarkColors.darkText
        : isFilled
        ? LightColors.light3
        : "transparent",
      borderWidth: 1,
      borderColor: hasError
        ? CommonColors.error
        : isFilled
        ? "#3377FF"
        : isDark
        ? DarkColors.dark3
        : LightColors.light1,
      borderRadius: 12,
      paddingHorizontal: 16,
    },
    inputFilled: {
      backgroundColor: isDark ? DarkColors.darkText : LightColors.light3,
      borderColor: "#3377FF",
    },
    inputError: {
      borderColor: CommonColors.error,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: isDark ? CommonColors.white : TextColors.primary,
    },
    placeholder: {
      color: TextColors.placeholder,
    },
    errorText: {
      fontSize: 12,
      color: CommonColors.error,
      marginTop: 4,
    },
    iosInlineWrapper: {
      marginTop: 12,
      borderRadius: 16,
      overflow: "hidden",
      backgroundColor: isDark ? DarkColors.darkBorder : CommonColors.white,
      borderWidth: 1,
      borderColor: isDark ? DarkColors.dark3 : LightColors.lightBorder,
    },
    iosInlineHeader: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? DarkColors.dark3 : LightColors.lightBorder,
    },
    cancelButton: {
      fontSize: 16,
      color: TextColors.secondary,
    },
    picker: {
      height: Platform.OS === "ios" ? 320 : 200,
      backgroundColor: isDark ? DarkColors.darkBorder : CommonColors.white,
    },
  });
