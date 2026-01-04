import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import {
  Platform,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

import {
  BrandColors,
  CommonColors,
  DarkColors,
  LightColors,
  TextColors,
} from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { inputStyles } from "./input.styles";

export type InputProps = TextInputProps & {
  label: string;
  placeholder?: string;
  error?: string;
  type?: "text" | "password" | "email" | "textarea";
  variant?: "default" | "textarea";
  themeMode?: "auto" | "light" | "dark";
};

export function Input({
  label,
  placeholder,
  error,
  type = "text",
  variant = "default",
  themeMode = "auto",
  value,
  onChangeText,
  textContentType,
  autoComplete,
  autoFocus,
  ...props
}: InputProps) {
  const { isDark: appIsDark } = useTheme();
  const isDark = themeMode === "auto" ? appIsDark : themeMode === "dark";
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = type === "password";
  const isTextarea = variant === "textarea" || type === "textarea";
  const isFilled = value && value.length > 0;
  const hasError = !!error;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={inputStyles.container}>
      <Text
        style={[
          inputStyles.label,
          { color: isDark ? DarkColors.dark4 : TextColors.primary },
        ]}
      >
        {label}
      </Text>
      <View style={inputStyles.inputContainer}>
        <View
          style={[
            isTextarea ? inputStyles.textareaWrapper : inputStyles.inputWrapper,
            isPassword && !isTextarea && inputStyles.inputWrapperPassword,
            {
              backgroundColor: isDark
                ? DarkColors.darkText
                : isFilled
                ? LightColors.light3
                : "transparent",
              borderColor: hasError
                ? CommonColors.error
                : isFilled
                ? BrandColors.main
                : isDark
                ? DarkColors.dark3
                : LightColors.light1,
            },
            isFilled && inputStyles.inputFilled,
            hasError && inputStyles.inputError,
          ]}
        >
          <TextInput
            editable={props.editable !== false}
            {...props}
            style={[
              inputStyles.input,
              isTextarea && inputStyles.textarea,
              {
                backgroundColor: "transparent",
                color: isDark ? CommonColors.white : TextColors.primary,
              },
              props.style, // Apply any custom styles from props
            ]}
            placeholder={placeholder}
            placeholderTextColor={
              isDark ? DarkColors.dark4 : TextColors.placeholder
            }
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={isPassword && !isPasswordVisible}
            autoCapitalize={type === "email" ? "none" : "sentences"}
            keyboardType={
              type === "email"
                ? "email-address"
                : props.keyboardType || "default"
            }
            multiline={isTextarea}
            numberOfLines={isTextarea ? 4 : undefined}
            textAlignVertical={isTextarea ? "top" : "center"}
            autoComplete={autoComplete || "off"}
            autoCorrect={false}
            spellCheck={false}
            importantForAutofill="no"
            textContentType={textContentType || "none"}
            autoFocus={autoFocus || false}
            {...(Platform.OS === "android"
              ? ({ includeFontPadding: false } as any)
              : {})} // Remove Android's default font padding
          />
        </View>
        {isPassword && (
          <TouchableOpacity
            style={inputStyles.eyeIcon}
            onPress={togglePasswordVisibility}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
              size={20}
              color={isDark ? DarkColors.dark4 : TextColors.secondary}
            />
          </TouchableOpacity>
        )}
      </View>
      {hasError && (
        <View style={inputStyles.errorContainer}>
          <Text style={inputStyles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
}
