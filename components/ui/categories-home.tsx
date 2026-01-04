import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { BrandColors, CommonColors, TextColors } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { Category } from "@/types/categories";
import { CategoryCard } from "./category-card";

type CategoriesHomeProps = {
  categories: Category[];
};

export function CategoriesHome({ categories }: CategoriesHomeProps) {
  const { isDark } = useTheme();

  const handleViewAll = () => {
    router.push("/(tabs)/categories" as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            { color: isDark ? CommonColors.white : TextColors.primary },
          ]}
        >
          Categories
        </Text>
        <TouchableOpacity onPress={handleViewAll} activeOpacity={0.7}>
          <Text style={[styles.viewAll, { color: BrandColors.main }]}>
            View All
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        {categories.map((category) => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  viewAll: {
    fontSize: 14,
    fontWeight: "600",
  },
  scrollView: {
    marginHorizontal: -24,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
});
