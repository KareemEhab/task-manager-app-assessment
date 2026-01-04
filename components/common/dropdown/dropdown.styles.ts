import { StyleSheet } from "react-native";

import {
  CommonColors,
  DarkColors,
  LightColors,
  TextColors,
  BrandColors,
} from "@/constants/theme";

export const getDropdownStyles = (
  isDark: boolean,
  isFilled: boolean,
  hasError: boolean,
  zIndex: number,
  isOpen: boolean
) =>
  StyleSheet.create({
    container: {
      marginBottom: 6,
      // Keep the input at normal stacking when closed; only raise stacking when open
      zIndex: isOpen ? zIndex : 0,
    },
    label: {
      fontSize: 14,
      fontWeight: "500",
      color: isDark ? DarkColors.dark4 : TextColors.primary,
      marginBottom: 8,
    },
    dropdownContainer: {
      position: "relative",
    },
    outsideOverlay: {
      position: "absolute",
      top: -9999,
      bottom: -9999,
      left: -9999,
      right: -9999,
    },
    dropdown: {
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
          ? BrandColors.main
          : isDark
            ? DarkColors.dark3
            : LightColors.light1,
      borderRadius: 12,
      paddingHorizontal: 16,
    },
    dropdownFilled: {
      backgroundColor: isDark ? DarkColors.darkText : LightColors.light3,
      borderColor: BrandColors.main,
    },
    dropdownError: {
      borderColor: CommonColors.error,
    },
    dropdownText: {
      flex: 1,
      fontSize: 16,
      color: isDark ? CommonColors.white : TextColors.primary,
    },
    placeholder: {
      color: TextColors.placeholder,
    },
    optionsWrapper: {
      marginTop: 8,
      backgroundColor: isDark ? DarkColors.darkBorder : CommonColors.white,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: isDark ? DarkColors.dark3 : LightColors.lightBorder,
      maxHeight: 250,
      zIndex: zIndex + 1,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 10,
      overflow: "hidden",
    },
    optionsScroll: {
      maxHeight: 250,
    },
    option: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? DarkColors.dark3 : LightColors.lightBorder,
    },
    optionSelected: {
      backgroundColor: isDark ? DarkColors.darkText : LightColors.light3,
    },
    optionText: {
      fontSize: 16,
      color: isDark ? CommonColors.white : TextColors.primary,
    },
    optionTextSelected: {
      fontWeight: "600",
      color: BrandColors.main,
    },
    errorText: {
      fontSize: 12,
      color: CommonColors.error,
      marginTop: 4,
    },
  });


