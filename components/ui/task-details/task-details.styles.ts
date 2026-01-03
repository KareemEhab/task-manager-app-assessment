import { StyleSheet } from "react-native";

import {
  BrandColors,
  CommonColors,
  DarkColors,
  LightColors,
  TextColors,
} from "@/constants/theme";

export const getTaskDetailsStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? DarkColors.darkBackground : LightColors.light4,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 24,
      paddingBottom: 16,
    },
    backButton: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: isDark ? CommonColors.white : TextColors.primary,
      flex: 1,
      textAlign: "center",
    },
    editButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDark ? DarkColors.darkBorder : LightColors.light2,
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 24,
      paddingBottom: 40,
    },
    tabsContainer: {
      marginBottom: 20,
    },
    scrollContainer: {
      flex: 1,
      minHeight: 200,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 20,
    },
    commentInputContainer: {
      flexDirection: "row",
      gap: 12,
      alignItems: "flex-end",
      paddingBottom: 16,
      marginHorizontal: -24,
      paddingHorizontal: 24,
    },
    commentInput: {
      flex: 1,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      minHeight: 44,
      maxHeight: 100,
      fontSize: 14,
      backgroundColor: isDark ? DarkColors.darkBorder : LightColors.light3,
      color: isDark ? CommonColors.white : TextColors.primary,
    },
    sendButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: BrandColors.main,
    },
    footer: {
      flexDirection: "row",
      gap: 12,
      marginTop: 20,
      paddingTop: 20,
      borderTopWidth: 1,
      borderTopColor: isDark ? DarkColors.dark3 : LightColors.lightBorder,
    },
    footerButton: {
      flex: 1,
    },
    markDoneButton: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 12,
      gap: 8,
      backgroundColor: "#4CAF50",
    },
    markDoneText: {
      color: CommonColors.white,
      fontSize: 16,
      fontWeight: "600",
    },
    markDoneButtonDisabled: {
      opacity: 0.7,
    },
  });

