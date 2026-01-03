import { StyleSheet, Text, View } from "react-native";

import {
  BrandColors,
  CommonColors,
  DarkColors,
  LightColors,
  TextColors,
} from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";

export type TagVariant = "low" | "medium" | "high" | "default";

type TagProps = {
  label: string;
  variant?: TagVariant;
};

export function Tag({ label, variant = "default" }: TagProps) {
  const { isDark } = useTheme();
  const styles = getStyles(isDark, variant);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const getStyles = (isDark: boolean, variant: TagVariant) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
      backgroundColor:
        variant === "low"
          ? "#4CAF50"
          : variant === "medium"
            ? "#2196F3"
            : variant === "high"
              ? "#FFC107"
              : isDark
                ? DarkColors.dark2
                : LightColors.light1,
    },
    text: {
      fontSize: 12,
      fontWeight: "600",
      color:
        variant === "default"
          ? isDark
            ? CommonColors.white
            : TextColors.primary
          : CommonColors.white,
    },
  });

