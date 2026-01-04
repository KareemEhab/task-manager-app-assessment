import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/common/button/button";
import { Tabs } from "@/components/common/tabs/tabs";
import { Toast } from "@/components/common/toast";
import { DeleteCommentModal } from "@/components/modals/delete-comment-modal";
import { DeleteTaskModal } from "@/components/modals/delete-task-modal";
import { EditTaskModal } from "@/components/modals/edit-task-modal";
import { CommentsSection } from "@/components/ui/task-details/comments-section";
import { DetailsSection } from "@/components/ui/task-details/details-section";
import { getTaskDetailsStyles } from "@/components/ui/task-details/task-details.styles";
import { CommonColors, DarkColors, TextColors } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { Task, TaskComment } from "@/types/tasks";
import { useTasks } from "@/hooks/useTasks";
import { tasksAPI } from "@/services/api";
import { transformBackendTask } from "@/utils/task-transform";

export default function TaskDetailsScreen() {
  const { id, from } = useLocalSearchParams<{ id: string; from?: string }>();
  const { isDark } = useTheme();
  const [task, setTask] = useState<Task | null>(null);
  const [activeTab, setActiveTab] = useState<"details" | "comments">("details");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [commentToDeleteIndex, setCommentToDeleteIndex] = useState<
    number | null
  >(null);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<TaskComment[]>([]);
  const [isDeletingComment, setIsDeletingComment] = useState(false);

  const {
    showToast,
    toastMessage,
    setShowToast,
    setToastMessage,
    isMarkingDone,
    isDeleting,
    markTaskAsDone,
    deleteTask,
    addComment,
    deleteComment,
  } = useTasks({
    onTaskUpdate: (taskId: string, updates: Partial<Task>) => {
      if (task && task.id === taskId) {
        const updatedTask = { ...task, ...updates };
        setTask(updatedTask);
        setComments(updatedTask.comments || []);
      }
    },
    onTaskDelete: (taskId: string) => {
      // Task deletion handled in handleDelete
    },
    onSuccess: () => {
      // Success handled in handleDelete
    },
  });

  // Load task on mount
  useEffect(() => {
    const fetchTask = async () => {
      if (id) {
        try {
          const backendTask = await tasksAPI.getById(id);
          const transformedTask = transformBackendTask(backendTask);
          setTask(transformedTask);
          setComments(transformedTask.comments || []);
        } catch (error) {
          console.error("Error fetching task:", error);
          router.back();
        }
      }
    };

    fetchTask();
  }, [id]);

  // Reset expansion states when task changes
  useEffect(() => {
    setIsExpanded(false);
    setActiveTab("details");
    setCommentText("");
  }, [id]);

  if (!task) {
    return (
      <SafeAreaView style={getTaskDetailsStyles(isDark).container} edges={["top"]}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color={isDark ? CommonColors.white : TextColors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  const handleMarkAsDone = () => {
    markTaskAsDone(task);
  };

  const handleDelete = async () => {
    try {
      // Delete the task (this sets loading state and toast message)
      await deleteTask(task.id);

      // Close modal after deletion completes
      setShowDeleteModal(false);

      // Show toast before navigation
      setShowToast(true);
      setToastMessage("Task was successfully deleted");
      
      // Navigate back to home screen after a short delay
      setTimeout(() => {
        router.back();
      }, 500);
    } catch (error: any) {
      // Error handling is done in deleteTask hook
      // Keep modal open so user can see the error or try again
      // The toast will be shown by the deleteTask hook
      console.error("Delete failed:", error);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    Keyboard.dismiss();
    try {
      await addComment(task.id, commentText, comments);
      // Comments will be updated via onTaskUpdate callback
      setCommentText("");
    } catch (error) {
      console.error("Failed to add comment:", error);
      // Show error toast if needed
    }
  };

  const handleDeleteCommentClick = (index: number) => {
    setCommentToDeleteIndex(index);
    setShowDeleteCommentModal(true);
  };

  const handleDeleteCommentConfirm = async () => {
    // Prevent double calls
    if (isDeletingComment || commentToDeleteIndex === null) {
      return;
    }

    setIsDeletingComment(true);
    try {
      await deleteComment(task.id, commentToDeleteIndex, comments);
      // Comments will be updated via onTaskUpdate callback
      setShowDeleteCommentModal(false);
      setCommentToDeleteIndex(null);
    } catch (error) {
      console.error("Failed to delete comment:", error);
      setShowDeleteCommentModal(false);
      setCommentToDeleteIndex(null);
    } finally {
      setIsDeletingComment(false);
    }
  };

  const styles = getTaskDetailsStyles(isDark);

  return (
    <>
      <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              // If we came from calendar, navigate back to calendar
              if (from === "calendar") {
                router.replace("/(tabs)/calendar" as any);
              } else {
                router.back();
              }
            }}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={isDark ? CommonColors.white : TextColors.primary}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Task</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setShowEditModal(true)}
            activeOpacity={0.7}
          >
            <Ionicons
              name="pencil-outline"
              size={20}
              color={isDark ? CommonColors.white : TextColors.primary}
            />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <Tabs
              tabs={[
                { label: "Details", value: "details" },
                {
                  label: `Comments(${comments.length})`,
                  value: "comments",
                },
              ]}
              activeTab={activeTab}
              onTabChange={(value) =>
                setActiveTab(value as "details" | "comments")
              }
            />
          </View>

          {/* Comment Input */}
          {activeTab === "comments" && (
            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Add a comment..."
                placeholderTextColor={
                  isDark ? DarkColors.dark4 : TextColors.placeholder
                }
                value={commentText}
                onChangeText={setCommentText}
                multiline
              />
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleAddComment}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="paper-plane-outline"
                  size={20}
                  color={CommonColors.white}
                />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.scrollContainer}>
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={true}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag"
            >
              {activeTab === "details" ? (
                <DetailsSection
                  task={task}
                  isExpanded={isExpanded}
                  onToggleExpand={() => setIsExpanded(!isExpanded)}
                />
              ) : (
                <CommentsSection
                  comments={comments}
                  onDeleteCommentClick={handleDeleteCommentClick}
                />
              )}
            </ScrollView>
          </View>

          {/* Footer Buttons */}
          <View style={styles.footer}>
            {task.status === "completed" ? (
              <Button
                variant="danger"
                title="Delete"
                onPress={() => setShowDeleteModal(true)}
                style={styles.footerButton}
                disabled={isDeleting}
                loading={isDeleting}
              />
            ) : (
              <TouchableOpacity
                style={[
                  styles.markDoneButton,
                  isMarkingDone && styles.markDoneButtonDisabled,
                ]}
                onPress={handleMarkAsDone}
                activeOpacity={0.8}
                disabled={isMarkingDone}
              >
                {isMarkingDone ? (
                  <ActivityIndicator size="small" color={CommonColors.white} />
                ) : (
                  <>
                    <Ionicons
                      name="checkmark"
                      size={20}
                      color={CommonColors.white}
                    />
                    <Text style={styles.markDoneText}>Mark As Done</Text>
                  </>
                )}
              </TouchableOpacity>
            )}
            <Button
              variant="cancel"
              title="Close"
              onPress={() => {
                // If we came from calendar, navigate back to calendar
                if (from === "calendar") {
                  router.replace("/(tabs)/calendar" as any);
                } else {
                  router.back();
                }
              }}
              style={styles.footerButton}
            />
          </View>
        </View>

        <DeleteTaskModal
          visible={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          isLoading={isDeleting}
        />

        <DeleteCommentModal
          visible={showDeleteCommentModal}
          onClose={() => {
            if (!isDeletingComment) {
              setShowDeleteCommentModal(false);
              setCommentToDeleteIndex(null);
            }
          }}
          onConfirm={handleDeleteCommentConfirm}
          isLoading={isDeletingComment}
        />

        <Toast
          visible={showToast}
          message={toastMessage}
          onHide={() => setShowToast(false)}
        />
      </KeyboardAvoidingView>
      </SafeAreaView>

      {task && (
        <EditTaskModal
          visible={showEditModal}
          task={task}
          onClose={() => setShowEditModal(false)}
          onTaskUpdated={async () => {
            // Refresh task data from API
            if (id) {
              try {
                const backendTask = await tasksAPI.getById(id);
                const transformedTask = transformBackendTask(backendTask);
                setTask(transformedTask);
                setComments(transformedTask.comments || []);
              } catch (error) {
                console.error("Error refreshing task:", error);
              }
            }
            setShowEditModal(false);
          }}
          onTaskDeleted={() => {
            setShowEditModal(false);
            // Task is already deleted by the EditTaskModal, just navigate back
            router.back();
          }}
        />
      )}
    </>
  );
}
