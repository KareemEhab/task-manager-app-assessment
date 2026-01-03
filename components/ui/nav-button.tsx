import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { BrandColors, DarkColors } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";

type NavButtonProps = {
  icon: React.ReactNode;
  label: string;
  isSelected: boolean;
  onPress: () => void;
};

export function NavButton({
  icon,
  label,
  isSelected,
  onPress,
}: NavButtonProps) {
  const { isDark } = useTheme();

  const iconColor = isSelected
    ? isDark
      ? BrandColors.lighter
      : BrandColors.main
    : DarkColors.dark3;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon}
      <Text
        style={[
          styles.label,
          isSelected && styles.labelSelected,
          isDark && isSelected && styles.labelSelectedDark,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
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
