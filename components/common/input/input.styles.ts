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
  textarea: {
    height: 100,
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 16,
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

