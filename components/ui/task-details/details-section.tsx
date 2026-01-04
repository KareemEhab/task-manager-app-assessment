import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Tag } from "@/components/common/tag/tag";
import {
  BrandColors,
  CommonColors,
  DarkColors,
  LightColors,
  TextColors,
} from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Task } from "@/types/tasks";

type DetailsSectionProps = {
  task: Task;
  isExpanded: boolean;
  onToggleExpand: () => void;
};

export function DetailsSection({
  task,
  isExpanded,
  onToggleExpand,
}: DetailsSectionProps) {
  const { isDark } = useTheme();
  const { user } = useCurrentUser();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);
  const styles = getStyles(isDark);

  // Determine assigned to display text
  const getAssignedToText = () => {
    if (!task.assignedTo) return null;
    
    // Compare emails (both lowercased)
    const userEmailLower = user?.email?.toLowerCase();
    const assignedToLower = task.assignedTo.toLowerCase();
    
    if (userEmailLower && assignedToLower === userEmailLower) {
      return "You";
    }
    
    return task.assignedTo;
  };

  // Check if description is long enough to potentially need expansion
  // Approximate: 5 lines * ~50 characters per line = ~250 characters
  const hasLongDescription = task.description.length > 250;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
    <>
      {/* Task Name */}
      <View style={styles.detailBox}>
        <Text style={styles.label}>Task Name</Text>
        <Text style={styles.value}>{task.title}</Text>
      </View>

      {/* Priority */}
      <View style={styles.detailBox}>
        <Text style={styles.label}>Priority</Text>
        <Tag
          label={
            task.priority.charAt(0).toUpperCase() + task.priority.slice(1)
          }
          variant={task.priority}
        />
      </View>

      {/* Due Date */}
      {task.dueDate && (
        <View style={styles.detailBox}>
          <Text style={styles.label}>Due Date</Text>
          <Text style={styles.value}>{formatDate(task.dueDate)}</Text>
        </View>
      )}

      {/* Status */}
      <View style={styles.detailBox}>
        <Text style={styles.label}>Status</Text>
        <View style={styles.statusContainer}>
          <Ionicons
            name="time-outline"
            size={16}
            color={isDark ? DarkColors.dark4 : TextColors.secondary}
          />
          <Text style={styles.value}>{getStatusText(task.status)}</Text>
        </View>
      </View>

      {/* Description */}
      <View style={styles.detailBox}>
        <Text style={styles.label}>Description</Text>
        <View style={styles.descriptionContainer}>
          <Text
            style={styles.value}
            numberOfLines={isDescriptionExpanded ? undefined : 5}
            ellipsizeMode="tail"
            onTextLayout={(e) => {
              const { lines } = e.nativeEvent;
              if (!isDescriptionExpanded && lines.length > 5) {
                setShowExpandButton(true);
              } else if (lines.length <= 5) {
                setShowExpandButton(false);
              }
            }}
          >
            {task.description}
          </Text>
          {(hasLongDescription || showExpandButton) && (
            <TouchableOpacity
              onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              activeOpacity={0.7}
              style={styles.expandDescriptionButton}
            >
              <Text style={styles.expandLink}>
                {isDescriptionExpanded ? "Show Less" : "Show More"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Assigned To */}
      {task.assignedTo && (
        <View style={styles.detailBox}>
          <Text style={styles.label}>Assigned To</Text>
          <Text style={styles.value}>{getAssignedToText()}</Text>
        </View>
      )}

      {/* Additional Details */}
      <View style={styles.additionalDetailsSection}>
        <View style={styles.additionalDetailsHeader}>
          <Text style={styles.additionalDetailsTitle}>Additional Details</Text>
          <TouchableOpacity
            onPress={onToggleExpand}
            activeOpacity={0.7}
          >
            <Text style={styles.expandLink}>
              {isExpanded ? "Click To Close" : "Click To Expand"}
            </Text>
          </TouchableOpacity>
        </View>

        {isExpanded && (
          <View style={styles.additionalDetailsContent}>
            <View style={styles.additionalDetailRow}>
              <Text style={styles.additionalDetailLabel}>Created By:</Text>
              <Text style={styles.additionalDetailValue}>
                {task.createdBy}
              </Text>
            </View>
            <View style={styles.additionalDetailRow}>
              <Text style={styles.additionalDetailLabel}>Created On:</Text>
              <Text style={styles.additionalDetailValue}>
                {formatDate(task.createdOn)}
              </Text>
            </View>
            <View style={styles.additionalDetailRow}>
              <Text style={styles.additionalDetailLabel}>Last Updated:</Text>
              <Text style={styles.additionalDetailValue}>
                {formatDate(task.lastUpdated)}
              </Text>
            </View>
          </View>
        )}
      </View>
    </>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    detailBox: {
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      fontWeight: "500",
      marginBottom: 8,
      color: isDark ? DarkColors.dark4 : TextColors.secondary,
    },
    value: {
      fontSize: 16,
      fontWeight: "500",
      color: isDark ? CommonColors.white : TextColors.primary,
      lineHeight: 24,
    },
    descriptionContainer: {
      gap: 8,
    },
    expandDescriptionButton: {
      alignSelf: "flex-start",
      marginTop: 4,
    },
    statusContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    additionalDetailsSection: {
      marginTop: 8,
    },
    additionalDetailsHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    additionalDetailsTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: isDark ? CommonColors.white : TextColors.primary,
    },
    expandLink: {
      fontSize: 14,
      fontWeight: "500",
      color: BrandColors.main,
    },
    additionalDetailsContent: {
      borderRadius: 12,
      padding: 16,
      gap: 12,
      backgroundColor: isDark ? DarkColors.darkBorder : LightColors.light3,
    },
    additionalDetailRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    additionalDetailLabel: {
      fontSize: 14,
      color: isDark ? DarkColors.dark4 : TextColors.secondary,
    },
    additionalDetailValue: {
      fontSize: 14,
      fontWeight: "500",
      color: isDark ? CommonColors.white : TextColors.primary,
    },
  });

