import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Tag } from "@/components/common/tag/tag";
import {
  BrandColors,
  CommonColors,
  DarkColors,
  LightColors,
  TextColors,
} from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { Task } from "@/types/tasks";

type TaskCardProps = {
  task: Task;
  onPress?: () => void;
};

export function TaskCard({ task, onPress }: TaskCardProps) {
  const { isDark } = useTheme();
  const styles = getStyles(isDark);

  const handlePress = () => {
    onPress?.();
  };

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    return `${day} ${month}`;
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "upcoming":
        return "Upcoming";
      case "in-progress":
        return "In Progress";
      case "in-review":
        return "In Review";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: isDark ? DarkColors.darkText : CommonColors.white,
          borderColor: isDark ? DarkColors.dark3 : LightColors.lightBorder,
          shadowColor: isDark ? "#000" : "#000",
        },
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.titleRow}>
        <Text
          style={[
            styles.title,
            { color: isDark ? CommonColors.white : TextColors.primary },
          ]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {task.title}
        </Text>
        <Tag
          label={
            task.priority.charAt(0).toUpperCase() + task.priority.slice(1)
          }
          variant={task.priority}
        />
      </View>

      <Text
        style={[
          styles.description,
          { color: isDark ? DarkColors.dark4 : TextColors.secondary },
        ]}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {task.description}
      </Text>

      <View style={styles.categoriesContainer}>
        {task.categories.map((category, index) => (
          <Tag key={index} label={category} variant="default" />
        ))}
      </View>

      <View style={styles.separator} />

      <View style={styles.footer}>
        {task.status === "completed" ? (
          <View style={styles.completedContainer}>
            <Text style={styles.completedText}>Completed</Text>
            <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
          </View>
        ) : (
          <>
            <View style={styles.statusContainer}>
              <Ionicons
                name="time-outline"
                size={16}
                color={isDark ? DarkColors.dark4 : TextColors.secondary}
              />
              <Text
                style={[
                  styles.statusText,
                  { color: isDark ? DarkColors.dark4 : TextColors.secondary },
                ]}
              >
                {getStatusText(task.status)}
              </Text>
            </View>
            {task.dueDate && (
              <Text
                style={[
                  styles.dueDate,
                  { color: isDark ? DarkColors.dark4 : TextColors.secondary },
                ]}
              >
                {formatDate(task.dueDate)}
              </Text>
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    titleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 12,
    },
    title: {
      fontSize: 16,
      fontWeight: "600",
      flex: 1,
    },
    description: {
      fontSize: 14,
      lineHeight: 20,
      marginBottom: 12,
    },
    categoriesContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginBottom: 12,
    },
    separator: {
      height: 1,
      backgroundColor: isDark ? DarkColors.dark3 : LightColors.lightBorder,
      marginBottom: 12,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    statusContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    statusText: {
      fontSize: 14,
      fontWeight: "500",
    },
    dueDate: {
      fontSize: 14,
      fontWeight: "500",
    },
    completedContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    completedText: {
      fontSize: 14,
      fontWeight: "500",
      color: "#4CAF50",
    },
  });

