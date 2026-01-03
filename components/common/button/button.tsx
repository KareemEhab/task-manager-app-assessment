import * as Haptics from "expo-haptics";
import {
  Platform,
  Pressable,
  TouchableOpacity,
  type PressableProps,
  type StyleProp,
  type TouchableOpacityProps,
  type ViewStyle,
} from "react-native";

import { useTheme } from "@/contexts/theme-context";
import { getButtonStyles } from "./button.styles";
import { CancelVariant } from "./variants/cancel";
import { DangerVariant } from "./variants/danger";
import { PrimaryVariant } from "./variants/primary";
import { PrimaryTransparentVariant } from "./variants/primary-transparent";

type ButtonVariant = "primary" | "primary-transparent" | "danger" | "cancel";

export type ButtonProps = Omit<PressableProps, "style"> & {
  variant?: ButtonVariant;
  title: string;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  variant = "primary",
  title,
  loading = false,
  disabled,
  onPress,
  style,
  ...props
}: ButtonProps) {
  const { isDark } = useTheme();
  const styles = getButtonStyles(isDark);
  const isPrimary = variant === "primary";
  const isTransparent = variant === "primary-transparent";
  const isDanger = variant === "danger";
  const isCancel = variant === "cancel";

  const handlePress = (event: any) => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress?.(event);
  };

  const renderContent = () => {
    if (isPrimary) {
      return <PrimaryVariant title={title} loading={loading} />;
    }
    if (isTransparent) {
      return <PrimaryTransparentVariant title={title} loading={loading} />;
    }
    if (isDanger) {
      return <DangerVariant title={title} loading={loading} />;
    }
    if (isCancel) {
      return <CancelVariant title={title} loading={loading} />;
    }
    return null;
  };

  if (Platform.OS === "android") {
    return (
      <Pressable
        {...props}
        disabled={disabled || loading}
        onPress={handlePress}
        style={({ pressed }) => [
          styles.base,
          isPrimary && styles.primary,
          isTransparent && styles.primaryTransparent,
          isDanger && styles.danger,
          isCancel && styles.cancel,
          disabled && styles.disabled,
          pressed && styles.pressed,
          style,
        ]}
        android_ripple={{
          color:
            isPrimary || isDanger
              ? "rgba(255, 255, 255, 0.2)"
              : "rgba(51, 119, 255, 0.1)",
          borderless: false,
        }}
      >
        {renderContent()}
      </Pressable>
    );
  }

  // Filter out incompatible props for TouchableOpacity
  const {
    delayLongPress,
    android_ripple,
    unstable_pressDelay,
    ...touchableProps
  } = props as any;

  // IOS
  return (
    <TouchableOpacity
      {...(touchableProps as TouchableOpacityProps)}
      disabled={disabled || loading}
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        styles.base,
        isPrimary && styles.primary,
        isTransparent && styles.primaryTransparent,
        isDanger && styles.danger,
        isCancel && styles.cancel,
        disabled && styles.disabled,
        style,
      ]}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}
