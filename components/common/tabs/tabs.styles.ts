import { StyleSheet } from "react-native";

import { CommonColors, DarkColors, TextColors } from "@/constants/theme";

export const getTabsStyles = (isDark: boolean) =>
  StyleSheet.create({
    scrollView: {
      flexGrow: 0,
    },
    container: {
      flexDirection: "row",
      gap: 8,
      paddingVertical: 4,
    },
    tab: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    tabActive: {
      backgroundColor: isDark ? DarkColors.darkBorder : TextColors.secondary,
    },
    tabText: {
      fontSize: 14,
      fontWeight: "500",
      color: isDark ? DarkColors.dark4 : TextColors.secondary,
    },
    tabTextActive: {
      fontWeight: "600",
      color: CommonColors.white,
    },
  });


