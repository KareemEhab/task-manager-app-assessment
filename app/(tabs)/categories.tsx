import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CategoryCard } from "@/components/ui/category-card";
import {
  CommonColors,
  DarkColors,
  LightColors,
  TextColors,
} from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { categories } from "@/data/categories";

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: 24,
      paddingTop: 24,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 24,
      paddingBottom: 16,
    },
    backButton: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: isDark ? CommonColors.white : TextColors.primary,
      flex: 1,
      textAlign: "center",
    },
  });

export default function CategoriesScreen() {
  const { isDark } = useTheme();
  const styles = getStyles(isDark);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? DarkColors.dark1 : LightColors.light4 },
      ]}
      edges={["top"]}
    >
      <StatusBar style={isDark ? "light" : "dark"} />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDark ? CommonColors.white : TextColors.primary}
          />
        </TouchableOpacity>
        <Text style={styles.title}>All Categories</Text>
        <View style={styles.backButton} />
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => (
          <View key={category.id} style={{ marginBottom: 16 }}>
            <CategoryCard {...category} fullWidth />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
