import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { Tabs } from "@/components/common/tabs/tabs";
import { TaskCard } from "@/components/ui/task-card";
import {
  CommonColors,
  DarkColors,
  LightColors,
  TextColors,
} from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { Task } from "@/types/tasks";
import { tasksAPI } from "@/services/api";
import { transformBackendTask } from "@/utils/task-transform";
import { useCurrentUser } from "@/hooks/useCurrentUser";

type TasksHomeProps = {
  tasks: Task[];
  onTaskPress: (task: Task) => void;
};

export function TasksHome({ tasks, onTaskPress }: TasksHomeProps) {
  const { isDark } = useTheme();
  const { user } = useCurrentUser();
  const [activeTab, setActiveTab] = useState<"active" | "completed" | "assigned-to-others">("active");
  const [assignedToOthersTasks, setAssignedToOthersTasks] = useState<Task[]>([]);
  const [isLoadingAssigned, setIsLoadingAssigned] = useState(false);
  const styles = getStyles(isDark);

  // Filter out tasks created by me but assigned to others
  // These should only appear in the "Assigned to Others" tab
  const isTaskAssignedToOthers = (task: Task): boolean => {
    if (!user || !task.assignedTo) return false;
    // Task is created by me (check by name) but assigned to someone else (not me)
    const isCreatedByMe = task.createdBy === user.name || task.createdBy === user.email;
    const userEmailLower = user.email?.toLowerCase();
    const assignedToLower = task.assignedTo?.toLowerCase();
    const isAssignedToMe = assignedToLower === userEmailLower;
    // Task is created by me but NOT assigned to me (assigned to someone else)
    return isCreatedByMe && !isAssignedToMe && !!task.assignedTo;
  };

  // Filter tasks to exclude those assigned to others
  // Only show tasks that are either:
  // 1. Assigned to me, OR
  // 2. Created by me and not assigned to anyone (assignedTo is empty/undefined)
  const myTasks = tasks.filter((task) => {
    if (!user) return true; // If no user, show all (shouldn't happen when logged in)
    
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

  // Fetch tasks created by me but assigned to others
  useEffect(() => {
    const fetchAssignedToOthers = async () => {
      if (activeTab === "assigned-to-others") {
        setIsLoadingAssigned(true);
        try {
          const backendTasks = await tasksAPI.getCreatedByMe();
          const transformedTasks = backendTasks.map(transformBackendTask);
          setAssignedToOthersTasks(transformedTasks);
        } catch (error: any) {
          console.error("Error fetching assigned to others tasks:", error);
          // Log more details about the error
          if (error.response) {
            console.error("Response status:", error.response.status);
            console.error("Response data:", error.response.data);
          } else if (error.request) {
            console.error("Request error:", error.request);
          } else {
            console.error("Error message:", error.message);
          }
          setAssignedToOthersTasks([]);
        } finally {
          setIsLoadingAssigned(false);
        }
      }
    };

    fetchAssignedToOthers();
  }, [activeTab]);

  // Calculate task counts (excluding tasks assigned to others)
  const activeCount = myTasks.filter((task) => task.status !== "completed").length;
  const completedCount = myTasks.filter((task) => task.status === "completed").length;
  const assignedToOthersCount = assignedToOthersTasks.length;

  // Filter tasks based on active tab
  const filteredTasks = 
    activeTab === "active"
      ? myTasks.filter((task) => task.status !== "completed")
      : activeTab === "completed"
      ? myTasks.filter((task) => task.status === "completed")
      : assignedToOthersTasks;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            { color: isDark ? CommonColors.white : TextColors.primary },
          ]}
        >
          My Tasks
        </Text>
        <Tabs
          tabs={[
            { label: `Active (${activeCount})`, value: "active" },
            { label: `Completed (${completedCount})`, value: "completed" },
            { label: `Others (${assignedToOthersCount})`, value: "assigned-to-others" },
          ]}
          activeTab={activeTab}
          onTabChange={(value) => setActiveTab(value as "active" | "completed" | "assigned-to-others")}
        />
      </View>
      <View style={styles.tasksContainer}>
        {activeTab === "assigned-to-others" && isLoadingAssigned ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={isDark ? CommonColors.white : TextColors.primary} />
          </View>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} onPress={() => onTaskPress(task)} />
          ))
        )}
      </View>
    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      marginTop: 24,
    },
    header: {
      marginBottom: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 16,
    },
    tasksContainer: {
      gap: 0,
    },
    loadingContainer: {
      padding: 20,
      alignItems: "center",
      justifyContent: "center",
    },
  });

