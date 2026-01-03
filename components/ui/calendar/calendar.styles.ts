import { StyleSheet } from "react-native";

import {
  BrandColors,
  CommonColors,
  DarkColors,
  LightColors,
  TextColors,
} from "@/constants/theme";

export const getCalendarStyles = (isDark: boolean) =>
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
      paddingTop: 60,
      paddingBottom: 16,
    },
    headerLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    monthYearButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      backgroundColor: isDark ? DarkColors.darkBorder : LightColors.light2,
    },
    monthYearText: {
      fontSize: 18,
      fontWeight: "600",
      color: isDark ? CommonColors.white : TextColors.primary,
    },
    daysContainer: {
      paddingVertical: 16,
    },
    dayItem: {
      width: 60,
      alignItems: "center",
      paddingVertical: 12,
      marginHorizontal: 4,
      borderRadius: 12,
    },
    dayItemSelected: {
      backgroundColor: BrandColors.main,
      opacity: 0.8,
    },
    dayNumber: {
      fontSize: 16,
      fontWeight: "500",
      marginBottom: 4,
      color: isDark ? CommonColors.white : TextColors.primary,
    },
    dayNumberSelected: {
      color: CommonColors.white,
    },
    dayName: {
      fontSize: 12,
      fontWeight: "400",
      color: isDark ? DarkColors.dark4 : TextColors.secondary,
    },
    dayNameSelected: {
      color: CommonColors.white,
    },
    tasksContainer: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 24,
    },
    tasksHeader: {
      fontSize: 20,
      fontWeight: "600",
      marginBottom: 16,
      color: isDark ? CommonColors.white : TextColors.primary,
    },
    taskItem: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      marginBottom: 12,
      borderRadius: 12,
      backgroundColor: isDark ? DarkColors.darkText : CommonColors.white,
    },
    taskDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: BrandColors.main,
      marginRight: 12,
    },
    taskContent: {
      flex: 1,
    },
    taskTitle: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 4,
      color: isDark ? CommonColors.white : TextColors.primary,
    },
    taskTime: {
      fontSize: 14,
      color: isDark ? DarkColors.dark4 : TextColors.secondary,
    },
    emptyState: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 60,
    },
    emptyStateText: {
      fontSize: 16,
      color: isDark ? DarkColors.dark4 : TextColors.secondary,
      textAlign: "center",
    },
  });
