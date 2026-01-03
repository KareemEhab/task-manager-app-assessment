import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { CommonColors, DarkColors, TextColors } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";

type CategoryCardProps = {
  id: string;
  name: string;
  projectCount: number;
  percentage: number;
  gradientColors: [string, string];
  fullWidth?: boolean;
};

export function CategoryCard({
  id,
  name,
  projectCount,
  percentage,
  gradientColors,
  fullWidth = false,
}: CategoryCardProps) {
  const { isDark } = useTheme();

  const handlePress = () => {
    // Navigate to category detail tab (to be implemented)
    router.push(`/(tabs)/category/${id}` as any);
  };

  const containerStyle = [
    styles.container,
    fullWidth && styles.containerFullWidth,
  ];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={gradientColors}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={styles.headerSection}>
          <Text style={styles.categoryName}>{name}</Text>
          <Text style={styles.projectCount}>{projectCount} Projects</Text>
        </View>
      </LinearGradient>
      <View
        style={[
          styles.footerSection,
          {
            backgroundColor: isDark
              ? DarkColors.darkBorder
              : CommonColors.white,
          },
        ]}
      >
        <View style={styles.progressContainer}>
          <Text
            style={[
              styles.percentage,
              {
                color: isDark ? CommonColors.white : TextColors.primary,
              },
            ]}
          >
            {percentage}%
          </Text>
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${percentage}%`,
                  backgroundColor: gradientColors[0],
                },
              ]}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 280,
    borderRadius: 16,
    overflow: "hidden",
    marginRight: 16,
  },
  containerFullWidth: {
    width: "100%",
    marginRight: 0,
  },
  gradient: {
    padding: 20,
    paddingBottom: 16,
  },
  headerSection: {
    gap: 4,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: "bold",
    color: CommonColors.white,
  },
  projectCount: {
    fontSize: 14,
    color: CommonColors.white,
    opacity: 0.9,
  },
  footerSection: {
    padding: 16,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  percentage: {
    fontSize: 16,
    fontWeight: "600",
    minWidth: 40,
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 4,
  },
});
