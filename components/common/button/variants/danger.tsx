import { ActivityIndicator, Text } from "react-native";

import { CommonColors } from "@/constants/theme";
import { getButtonStyles } from "../button.styles";
import { useTheme } from "@/contexts/theme-context";

type DangerVariantProps = {
  title: string;
  loading: boolean;
};

export function DangerVariant({ title, loading }: DangerVariantProps) {
  const { isDark } = useTheme();
  const styles = getButtonStyles(isDark);

  if (loading) {
    return <ActivityIndicator color={CommonColors.white} size="small" />;
  }

  return <Text style={[styles.text, styles.dangerText]}>{title}</Text>;
}

