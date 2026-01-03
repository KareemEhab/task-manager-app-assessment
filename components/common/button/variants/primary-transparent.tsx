import { ActivityIndicator, Text } from "react-native";

import { BrandColors } from "@/constants/theme";
import { getButtonStyles } from "../button.styles";
import { useTheme } from "@/contexts/theme-context";

type PrimaryTransparentVariantProps = {
  title: string;
  loading: boolean;
};

export function PrimaryTransparentVariant({
  title,
  loading,
}: PrimaryTransparentVariantProps) {
  const { isDark } = useTheme();
  const styles = getButtonStyles(isDark);

  if (loading) {
    return <ActivityIndicator color={BrandColors.main} size="small" />;
  }

  return (
    <Text style={[styles.text, styles.primaryTransparentText]}>{title}</Text>
  );
}

