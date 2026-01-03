import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/common/button/button";
import { CategoriesHome } from "@/components/ui/categories-home";
import { HomeHeader } from "@/components/ui/home-header";
import { TasksHome } from "@/components/ui/tasks-home";
import {
  CommonColors,
  DarkColors,
  LightColors,
  TextColors,
} from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { categories } from "@/data/categories";
import { tasks } from "@/data/tasks";

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? DarkColors.darkBackground : LightColors.light4,
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
    emptyStateContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 24,
      paddingTop: 60,
    },
    emptyStateText: {
      fontSize: 20,
      fontWeight: "600",
      textAlign: "center",
      marginBottom: 24,
    },
    createButton: {
      width: "100%",
      maxWidth: 300,
    },
  });

export default function HomeScreen() {
  const { isDark } = useTheme();
  const styles = getStyles(isDark);

  // Check if there are no categories and no tasks
  const hasNoData = tasks.length === 0;

  const handleCreateTask = () => {
    // Handle create task action (to be implemented)
    console.log("Create task pressed");
  };

  return (
    <View style={styles.container}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <HomeHeader />
      <View style={styles.separator} />
      {hasNoData ? (
        <View style={styles.emptyStateContainer}>
          <Text
            style={[
              styles.emptyStateText,
              { color: isDark ? CommonColors.white : TextColors.primary },
            ]}
          >
            Welcome, go ahead and create your first task!
          </Text>
          <Button
            variant="primary"
            title="Create Task"
            onPress={handleCreateTask}
            style={styles.createButton}
          />
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          {categories.length > 0 && <CategoriesHome categories={categories} />}
          {tasks.length > 0 && <TasksHome />}
        </ScrollView>
      )}
    </View>
  );
}
