import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";

import { TextColors } from "@/constants/theme";
import { inputStyles } from "./input.styles";

export type InputProps = TextInputProps & {
  label: string;
  placeholder?: string;
  error?: string;
  type?: "text" | "password" | "email";
};

export function Input({
  label,
  placeholder,
  error,
  type = "text",
  value,
  onChangeText,
  ...props
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = type === "password";
  const isFilled = value && value.length > 0;
  const hasError = !!error;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={inputStyles.container}>
      <Text style={inputStyles.label}>{label}</Text>
      <View style={inputStyles.inputContainer}>
        <TextInput
          {...props}
          style={[
            inputStyles.input,
            isFilled && inputStyles.inputFilled,
            hasError && inputStyles.inputError,
          ]}
          placeholder={placeholder}
          placeholderTextColor={TextColors.placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword && !isPasswordVisible}
          autoCapitalize={type === "email" ? "none" : "sentences"}
          keyboardType={type === "email" ? "email-address" : "default"}
        />
        {isPassword && (
          <TouchableOpacity
            style={inputStyles.eyeIcon}
            onPress={togglePasswordVisibility}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
              size={20}
              color={TextColors.secondary}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={inputStyles.errorContainer}>
        {hasError && <Text style={inputStyles.errorText}>{error}</Text>}
      </View>
    </View>
  );
}

