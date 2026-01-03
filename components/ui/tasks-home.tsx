import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Tabs } from "@/components/common/tabs/tabs";
import { TaskCard } from "@/components/ui/task-card";
import {
  CommonColors,
  DarkColors,
  LightColors,
  TextColors,
} from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { Task, tasks } from "@/data/tasks";

export function TasksHome() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");
  const styles = getStyles(isDark);

  const filteredTasks = tasks.filter((task) =>
    activeTab === "active" ? !task.done : task.done
  );

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
            { label: "Active", value: "active" },
            { label: "Completed", value: "completed" },
          ]}
          activeTab={activeTab}
          onTabChange={(value) => setActiveTab(value as "active" | "completed")}
        />
      </View>
      <View style={styles.tasksContainer}>
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
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
  });

