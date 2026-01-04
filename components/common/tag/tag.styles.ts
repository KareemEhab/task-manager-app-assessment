import { StyleSheet } from "react-native";

import { CommonColors, DarkColors, LightColors, TextColors } from "@/constants/theme";
import type { TagVariant } from "./tag";

const getTagTextColor = (isDark: boolean, variant: TagVariant) => {
  if (variant === "default") return isDark ? CommonColors.white : TextColors.primary;
  return CommonColors.white;
};

const getTagBackgroundColor = (isDark: boolean, variant: TagVariant) => {
  if (variant === "low") return "#4CAF50";
  if (variant === "medium") return "#2196F3";
  if (variant === "high") return "#FFC107";
  return isDark ? DarkColors.dark2 : LightColors.light1;
};

export const getTagStyles = (isDark: boolean, variant: TagVariant) => {
  const textColor = getTagTextColor(isDark, variant);
  const backgroundColor = getTagBackgroundColor(isDark, variant);

  return {
    styles: StyleSheet.create({
      container: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        alignSelf: "flex-start",
        backgroundColor,
        gap: 6,
      },
      text: {
        fontSize: 12,
        fontWeight: "600",
        color: textColor,
      },
      deleteButton: {
        marginLeft: 4,
        padding: 2,
      },
    }),
    textColor,
  };
};


