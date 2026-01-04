import { StyleSheet } from "react-native";

import { DarkColors, LightColors } from "@/constants/theme";

export const getBottomDrawerStyles = (isDark: boolean) =>
  StyleSheet.create({
    background: {
      // Match app screen background (e.g. Home/Categories screens)
      backgroundColor: isDark ? DarkColors.darkBackground : LightColors.light4,
    },
    handleIndicator: {
      backgroundColor: isDark ? DarkColors.dark3 : LightColors.lightBorder,
      width: 40,
      height: 4,
    },
  });


