import { StyleSheet } from "react-native";

import {
  BrandColors,
  CommonColors,
  DarkColors,
  LightColors,
  TextColors,
} from "@/constants/theme";

export const getMonthYearPickerStyles = (isDark: boolean) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      width: "90%",
      maxWidth: 400,
      borderRadius: 16,
      padding: 24,
      backgroundColor: isDark ? DarkColors.darkBorder : CommonColors.white,
    },
    modalHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 24,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "600",
      color: isDark ? CommonColors.white : TextColors.primary,
    },
    monthYearGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
    },
    monthYearItem: {
      width: "30%",
      paddingVertical: 16,
      alignItems: "center",
      borderRadius: 8,
      backgroundColor: isDark ? DarkColors.darkText : LightColors.light3,
    },
    monthYearItemSelected: {
      backgroundColor: BrandColors.main,
    },
    monthYearItemText: {
      fontSize: 16,
      fontWeight: "500",
      color: isDark ? CommonColors.white : TextColors.primary,
    },
    monthYearItemTextSelected: {
      color: CommonColors.white,
    },
    yearSelector: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    yearButton: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      backgroundColor: isDark ? DarkColors.darkText : LightColors.light3,
    },
    yearText: {
      fontSize: 18,
      fontWeight: "600",
      color: isDark ? CommonColors.white : TextColors.primary,
    },
    closeButton: {
      padding: 8,
    },
  });
