import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";

import { TaskCard } from "@/components/ui/task-card";
import {
  CommonColors,
  DarkColors,
  LightColors,
  TextColors,
} from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { Task } from "@/types/tasks";
import { useFetchTasks } from "@/hooks/useFetchTasks";
import { useCategories } from "@/hooks/useCategories";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark
        ? DarkColors.darkBackground
        : LightColors.light4,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: 24,
      paddingTop: 24,
      paddingBottom: 24,
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
    emptyStateContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 24,
      paddingTop: 60,
    },
    emptyStateText: {
      fontSize: 18,
      fontWeight: "600",
      textAlign: "center",
      color: isDark ? CommonColors.white : TextColors.primary,
    },
    tasksContainer: {
      gap: 0,
    },
  });

export default function CategoryTasksScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isDark } = useTheme();
  const styles = getStyles(isDark);
  const { tasks: allTasks, isLoading: tasksLoading, refetch: refetchTasks } =
    useFetchTasks();
  const { categories, isLoading: categoriesLoading, refetch: refetchCategories } =
    useCategories();
  const { user } = useCurrentUser();

  // Tasks and categories are managed by context, no need to refetch on focus

  // Find the category by ID
  const category = useMemo(() => {
    return categories.find((cat) => cat.id === id);
  }, [categories, id]);

  // Filter tasks by category and sort by date (newest to oldest)
  // Exclude tasks created by me but assigned to others
  const categoryTasks = useMemo(() => {
    if (!category || !allTasks.length) return [];

    // Filter out tasks created by me but assigned to others
    const myTasks = allTasks.filter((task) => {
      if (!user) return true;
      
      // If task has assignedTo, it must be assigned to me
      if (task.assignedTo) {
        const userEmailLower = user.email?.toLowerCase();
        const assignedToLower = task.assignedTo?.toLowerCase();
        return assignedToLower === userEmailLower;
      }
      
      // If no assignedTo, only show if created by me
      const isCreatedByMe = task.createdBy === user.name || task.createdBy === user.email;
      return isCreatedByMe;
    });

    // Filter tasks that include this category name in their categories array
    // Tasks store category names, so we match by name
    const filtered = myTasks.filter((task) =>
      task.categories.some((taskCategory) => 
        taskCategory.toLowerCase().trim() === category.name.toLowerCase().trim()
      )
    );

    // Sort by createdOn date (newest first) - top to bottom
    return filtered.sort((a, b) => {
      const dateA = a.createdOn.getTime();
      const dateB = b.createdOn.getTime();
      return dateB - dateA; // Newest first (top to bottom)
    });
  }, [allTasks, category, user]);

  const isLoading = tasksLoading || categoriesLoading;

  const handleTaskPress = (task: Task) => {
    router.push(`/(tabs)/task-details/${task.id}` as any);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
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
          <Text style={styles.title}>
            {category?.name || "Category"}
          </Text>
          <View style={styles.backButton} />
        </View>
        <View style={styles.emptyStateContainer}>
          <ActivityIndicator
            size="large"
            color={isDark ? CommonColors.white : TextColors.primary}
          />
        </View>
      </SafeAreaView>
    );
  }

  if (!category) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
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
          <Text style={styles.title}>Category Not Found</Text>
          <View style={styles.backButton} />
        </View>
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>
            Category not found. Please go back and try again.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
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
        <Text style={styles.title}>{category.name}</Text>
        <View style={styles.backButton} />
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {categoryTasks.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>
              No tasks found in this category.
            </Text>
          </View>
        ) : (
          <View style={styles.tasksContainer}>
            {categoryTasks.map((task) => (
              <TaskCard key={task.id} task={task} onPress={() => handleTaskPress(task)} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
