import { router, useFocusEffect, useLocalSearchParams, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/common/button/button";
import { Toast } from "@/components/common/toast";
import { CategoriesHome } from "@/components/ui/categories-home";
import { HomeHeader } from "@/components/ui/home-header";
import { TasksHome } from "@/components/ui/tasks-home";
import { AddTaskModal } from "@/components/modals/add-task-modal";
import {
  CommonColors,
  DarkColors,
  LightColors,
  TextColors,
} from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { useCategories } from "@/hooks/useCategories";
import { useFetchTasks } from "@/hooks/useFetchTasks";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Task } from "@/types/tasks";

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
  const { tasks: allTasks, isLoading: tasksLoading, refetch: refetchTasks } = useFetchTasks();
  const { categories, isLoading: categoriesLoading } = useCategories();
  const { user, isLoading: userLoading, refetch: refetchUser } = useCurrentUser();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const params = useLocalSearchParams<{ deletedTaskId?: string }>();

  // Check if there are no tasks
  const hasNoData = !tasksLoading && allTasks.length === 0;
  const isLoading = tasksLoading || categoriesLoading || userLoading;

  const navigation = useNavigation();

  // Prevent back navigation to onboarding when logged in
  useEffect(() => {
    if (!user) return; // Only prevent if user is logged in

    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      // Prevent all back navigation when user is logged in
      // This ensures users can't swipe back to onboarding
      e.preventDefault();
    });

    return unsubscribe;
  }, [navigation, user]);

  // Refetch user and tasks on focus (especially after login)
  useFocusEffect(
    useCallback(() => {
      refetchUser();
      // If we have a user but no tasks and we're not loading, refetch tasks
      // This handles the case where user logs in and navigates to home
      if (user && allTasks.length === 0 && !tasksLoading) {
        refetchTasks();
      }
    }, [refetchUser, refetchTasks, user, allTasks.length, tasksLoading])
  );

  const handleCreateTask = () => {
    setShowAddTaskModal(true);
  };

  const handleTaskAdded = () => {
    // Tasks are automatically updated in context, no need to refetch
    // Categories will be recalculated automatically from tasks
  };

  const handleTaskPress = (task: Task) => {
    router.push(`/(tabs)/task-details/${task.id}` as any);
  };

  return (
    <View style={styles.container}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <HomeHeader userName={user?.name || "User"} />
      <View style={styles.separator} />
      {isLoading ? (
        <View style={styles.emptyStateContainer}>
          <ActivityIndicator size="large" color={isDark ? CommonColors.white : TextColors.primary} />
        </View>
      ) : hasNoData ? (
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
          {allTasks.length > 0 && (
            <TasksHome tasks={allTasks} onTaskPress={handleTaskPress} />
          )}
        </ScrollView>
      )}
      <Toast
        visible={showToast}
        message={toastMessage}
        onHide={() => setShowToast(false)}
      />
      <AddTaskModal
        visible={showAddTaskModal}
        onClose={() => setShowAddTaskModal(false)}
        onTaskAdded={handleTaskAdded}
      />
    </View>
  );
}
