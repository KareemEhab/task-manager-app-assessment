import * as Haptics from "expo-haptics";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  type PressableProps,
  type StyleProp,
  type TouchableOpacityProps,
  type ViewStyle,
} from "react-native";

import { BrandColors, CommonColors } from "@/constants/theme";

type ButtonVariant = "primary" | "primary-transparent";

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
  const isPrimary = variant === "primary";
  const isTransparent = variant === "primary-transparent";

  const handlePress = (event: any) => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress?.(event);
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
          disabled && styles.disabled,
          pressed && styles.pressed,
          style,
        ]}
        android_ripple={{
          color: isPrimary
            ? "rgba(255, 255, 255, 0.2)"
            : "rgba(51, 119, 255, 0.1)",
          borderless: false,
        }}
      >
        {loading ? (
          <ActivityIndicator
            color={isPrimary ? CommonColors.white : BrandColors.main}
            size="small"
          />
        ) : (
          <Text
            style={[
              styles.text,
              isPrimary && styles.primaryText,
              isTransparent && styles.primaryTransparentText,
            ]}
          >
            {title}
          </Text>
        )}
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
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={isPrimary ? CommonColors.white : BrandColors.main}
          size="small"
        />
      ) : (
        <Text
          style={[
            styles.text,
            isPrimary && styles.primaryText,
            isTransparent && styles.primaryTransparentText,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 52,
  },
  primary: {
    backgroundColor: BrandColors.main,
  },
  primaryTransparent: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: BrandColors.main,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryText: {
    color: CommonColors.white,
  },
  primaryTransparentText: {
    color: BrandColors.main,
    fontWeight: "600",
  },
});
