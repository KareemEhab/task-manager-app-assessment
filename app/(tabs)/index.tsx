import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, View } from "react-native";

import { CategoriesHome } from "@/components/ui/categories-home";
import { HomeHeader } from "@/components/ui/home-header";
import { DarkColors, LightColors } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { categories } from "@/data/categories";

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? DarkColors.dark1 : LightColors.light4,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: 24,
      paddingTop: 24,
    },
    separator: {
      height: 1,
      width: "100%",
      backgroundColor: isDark ? DarkColors.dark3 : LightColors.lightBorder,
    },
  });

export default function HomeScreen() {
  const { isDark } = useTheme();
  const styles = getStyles(isDark);

  return (
    <View style={styles.container}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <HomeHeader />
      <View style={styles.separator} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <CategoriesHome categories={categories} />
      </ScrollView>
    </View>
  );
}
