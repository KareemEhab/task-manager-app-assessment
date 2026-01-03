import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { BrandColors, DarkColors } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";

type ToggleThemeProps = {
  isSelected: boolean;
};

export function ToggleTheme({ isSelected }: ToggleThemeProps) {
  const { toggleTheme, isDark } = useTheme();

  const iconColor = isSelected
    ? isDark
      ? BrandColors.lighter
      : BrandColors.main
    : DarkColors.dark3;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={toggleTheme}
      activeOpacity={0.7}
    >
      {isDark ? (
        <Ionicons name="sunny-outline" size={24} color={iconColor} />
      ) : (
        <Ionicons name="moon-outline" size={24} color={iconColor} />
      )}
      <Text
        style={[
          styles.label,
          isSelected && styles.labelSelected,
          isDark && isSelected && styles.labelSelectedDark,
        ]}
      >
        {isDark ? "Light" : "Dark"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 12,
    fontWeight: "400",
    color: DarkColors.dark3,
    marginTop: 4,
  },
  labelSelected: {
    fontWeight: "600",
    color: BrandColors.main,
  },
  labelSelectedDark: {
    color: BrandColors.lighter,
  },
});
