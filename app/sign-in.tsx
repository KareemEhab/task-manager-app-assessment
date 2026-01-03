import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { LightColors, TextColors } from "@/constants/theme";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateLogin } from "@/utils/validation";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = () => {
    Keyboard.dismiss();

    const validationErrors = validateLogin({
      email,
      password,
    });

    setErrors(validationErrors);

    // Check if there are any errors
    if (Object.values(validationErrors).some((error) => error !== "")) {
      return;
    }

    // Navigate to home screen on successful sign in
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>
            Welcome back — log in to manage your tasks effortlessly.
          </Text>

          <View style={styles.inputsContainer}>
            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) {
                  setErrors({ ...errors, email: "" });
                }
              }}
              type="email"
              error={errors.email}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) {
                  setErrors({ ...errors, password: "" });
                }
              }}
              type="password"
              error={errors.password}
            />
          </View>

          <View style={styles.buttonsContainer}>
            <Button
              variant="primary"
              title="Login"
              onPress={handleSignIn}
              style={styles.button}
            />
            <Button
              variant="primary-transparent"
              title="Back"
              onPress={() => router.back()}
              style={styles.button}
            />
          </View>

          <View style={styles.accountContainer}>
            <Text style={styles.accountText}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => router.push("/sign-up")}
              activeOpacity={0.7}
            >
              <Text style={styles.signUpLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LightColors.light4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: TextColors.primary,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: TextColors.secondary,
    textAlign: "center",
    marginBottom: 32,
  },
  inputsContainer: {
    marginBottom: 24,
  },
  buttonsContainer: {
    gap: 16,
  },
  button: {
    width: "100%",
  },
  accountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  accountText: {
    fontSize: 14,
    color: TextColors.secondary,
  },
  signUpLink: {
    fontSize: 14,
    color: BrandColors.main,
    fontWeight: "600",
  },
});
