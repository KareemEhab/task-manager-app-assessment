import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/common/button/button";
import { ImageSlider } from "@/components/ui/image-slider";
import { BrandColors, TextColors } from "@/constants/theme";

// Import onboarding images - Metro bundler resolves images from project root
const onboardingImage1 = require("../assets/images/IMG_3271.webp");
const onboardingImage2 = require("../assets/images/IMG_3272.webp");
const onboardingImage3 = require("../assets/images/IMG_3273.webp");

// Onboarding images array
const onboardingImages = [onboardingImage1, onboardingImage2, onboardingImage3];

export default function OnboardingScreen() {
  const handleSignIn = () => {
    router.push("/sign-in");
  };

  const handleSignUp = () => {
    router.push("/sign-up");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={[BrandColors.main, BrandColors.subtle]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={styles.topSection}>
          <View style={styles.sliderContainer}>
            <ImageSlider images={onboardingImages} />
          </View>
        </View>

        <View style={styles.bottomSection}>
          <Text style={styles.header}>Stay organized. Get more done.</Text>
          <Text style={styles.subheader}>
            Organize your workflow, prioritize with ease, and accomplish more
            every day.
          </Text>

          <View style={styles.buttonsContainer}>
            <Button
              variant="primary"
              title="Sign In"
              onPress={handleSignIn}
              style={styles.button}
            />
            <Button
              variant="primary-transparent"
              title="Sign Up"
              onPress={handleSignUp}
              style={styles.button}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  topSection: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
  sliderContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  bottomSection: {
    flex: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 80,
    justifyContent: "space-between",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 40,
    color: TextColors.primary,
    marginBottom: 12,
    textAlign: "center",
  },
  subheader: {
    fontSize: 16,
    lineHeight: 24,
    color: TextColors.secondary,
    marginBottom: 32,
    textAlign: "center",
  },
  buttonsContainer: {
    gap: 16,
  },
  button: {
    width: "100%",
  },
});
