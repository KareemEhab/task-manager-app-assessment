import { ActivityIndicator, Text } from "react-native";

import { CommonColors, TextColors } from "@/constants/theme";
import { getButtonStyles } from "../button.styles";
import { useTheme } from "@/contexts/theme-context";

type CancelVariantProps = {
  title: string;
  loading: boolean;
};

export function CancelVariant({ title, loading }: CancelVariantProps) {
  const { isDark } = useTheme();
  const styles = getButtonStyles(isDark);

  if (loading) {
    return (
      <ActivityIndicator
        color={isDark ? CommonColors.white : TextColors.primary}
        size="small"
      />
    );
  }

  return <Text style={[styles.text, styles.cancelText]}>{title}</Text>;
}

