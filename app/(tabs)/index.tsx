import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/common/button/button";
import { Toast } from "@/components/common/toast";
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
import { Task, tasks } from "@/data/tasks";

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
  const [allTasks, setAllTasks] = useState<Task[]>(tasks);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const params = useLocalSearchParams<{ deletedTaskId?: string }>();

  // Check if there are no tasks
  const hasNoData = allTasks.length === 0;

  // Handle task deletion from AsyncStorage when screen focuses
  useFocusEffect(
    useCallback(() => {
      const checkDeletedTask = async () => {
        try {
          const deletedTaskId = await AsyncStorage.getItem("deletedTaskId");
          if (deletedTaskId) {
            // Remove task from list
            setAllTasks((prevTasks) =>
              prevTasks.filter((t) => t.id !== deletedTaskId)
            );

            // Show toast
            setToastMessage("Task was successfully deleted");
            setShowToast(true);

            // Clear AsyncStorage
            await AsyncStorage.removeItem("deletedTaskId");

            // Hide toast after 2 seconds
            setTimeout(() => {
              setShowToast(false);
            }, 2000);
          }
        } catch (error) {
          console.log("Error checking deleted task:", error);
        }
      };

      checkDeletedTask();
    }, [])
  );

  const handleCreateTask = () => {
    // Handle create task action (to be implemented)
    console.log("Create task pressed");
  };

  const handleTaskPress = (task: Task) => {
    router.push(`/(tabs)/task-details/${task.id}` as any);
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
    </View>
  );
}
