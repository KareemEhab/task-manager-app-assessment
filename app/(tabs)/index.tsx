import { ScrollView, StyleSheet, Text, View } from "react-native";

import { HomeHeader } from "@/components/ui/home-header";
import {
  CommonColors,
  DarkColors,
  LightColors,
  TextColors,
} from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";

export default function HomeScreen() {
  const { isDark } = useTheme();
  const styles = getStyles(isDark);

  return (
    <View style={styles.container}>
      <HomeHeader />
      <View style={styles.separator} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Categories section will go here */}
        <Text style={styles.categoriesTitle}>Categories</Text>
      </ScrollView>
    </View>
  );
}

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
    categoriesTitle: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 16,
      color: isDark ? CommonColors.white : TextColors.primary,
    },
  });
