import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

import {
  BrandColors,
  CommonColors,
  LightColors,
  TextColors,
} from "@/constants/theme";

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
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          {...props}
          style={[
            styles.input,
            isFilled && styles.inputFilled,
            hasError && styles.inputError,
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
            style={styles.eyeIcon}
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
      <View style={styles.errorContainer}>
        {hasError && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: TextColors.primary,
    marginBottom: 8,
  },
  inputContainer: {
    position: "relative",
  },
  input: {
    height: 52,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: LightColors.light1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingRight: 50,
    fontSize: 16,
    color: TextColors.primary,
  },
  inputFilled: {
    backgroundColor: LightColors.light3,
    borderColor: BrandColors.main,
  },
  inputError: {
    borderColor: CommonColors.error,
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
  },
  errorContainer: {
    marginTop: 4,
    height: 20,
    justifyContent: "flex-start",
  },
  errorText: {
    fontSize: 12,
    color: CommonColors.error,
  },
});
