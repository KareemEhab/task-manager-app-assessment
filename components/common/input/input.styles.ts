import { StyleSheet } from "react-native";

import {
  BrandColors,
  CommonColors,
  LightColors,
  TextColors,
} from "@/constants/theme";

export const inputStyles = StyleSheet.create({
  container: {
    marginBottom: 10,
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
    flex: 1,
    padding: 0, // Padding handled by wrapper View
    fontSize: 16,
    lineHeight: 20,
    color: TextColors.primary,
    backgroundColor: "transparent",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    padding: 16,
    borderWidth: 1,
    borderColor: LightColors.light1,
    borderRadius: 12,
    backgroundColor: "transparent",
  },
  inputWrapperPassword: {
    paddingRight: 50, // Extra space for eye icon
  },
  textareaWrapper: {
    minHeight: 100,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: LightColors.light1,
    borderRadius: 12,
    backgroundColor: "transparent",
  },
  textarea: {
    flex: 1,
    padding: 0, // Padding handled by wrapper View
    lineHeight: 20,
    fontSize: 16,
    backgroundColor: "transparent",
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
  },
  errorText: {
    fontSize: 12,
    color: CommonColors.error,
  },
});
