import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { getTaskById } from "@/data/task-manager";
import { Task, TaskComment } from "@/data/tasks";
import { useTasks } from "@/hooks/useTasks";

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
    if (id) {
      const foundTask = getTaskById(id);
      if (foundTask) {
        setTask(foundTask);
        setComments(foundTask.comments || []);
      } else {
        router.back();
      }
    }
  }, [id]);

  // Reset expansion states when task changes
  useEffect(() => {
    setIsExpanded(false);
    setActiveTab("details");
    setCommentText("");
  }, [id]);

  if (!task) {
    return null;
  }

  const handleMarkAsDone = () => {
    markTaskAsDone(task);
  };

  const handleDelete = async () => {
    // Delete the task (this sets loading state and toast message)
    await deleteTask(task.id);

    // Close modal after deletion completes
    setShowDeleteModal(false);

    // Store deleted task ID in AsyncStorage for home screen to pick up
    await AsyncStorage.setItem("deletedTaskId", task.id);

    // Navigate back to home screen
    router.back();
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    Keyboard.dismiss();
    await addComment(task.id, commentText, comments);
    setComments([...comments, { name: "You", comment: commentText.trim() }]);
    setCommentText("");
  };

  const handleDeleteCommentClick = (index: number) => {
    setCommentToDeleteIndex(index);
    setShowDeleteCommentModal(true);
  };

  const handleDeleteCommentConfirm = async () => {
    if (commentToDeleteIndex !== null) {
      await deleteComment(task.id, commentToDeleteIndex, comments);
      setComments(comments.filter((_, i) => i !== commentToDeleteIndex));
      setShowDeleteCommentModal(false);
      setCommentToDeleteIndex(null);
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
            {task.done ? (
              <Button
                variant="danger"
                title="Delete"
                onPress={() => setShowDeleteModal(true)}
                style={styles.footerButton}
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
            setShowDeleteCommentModal(false);
            setCommentToDeleteIndex(null);
          }}
          onConfirm={handleDeleteCommentConfirm}
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
          onTaskUpdated={() => {
            // Refresh task data
            if (id) {
              const updatedTask = getTaskById(id);
              if (updatedTask) {
                setTask(updatedTask);
                setComments(updatedTask.comments || []);
              }
            }
            setShowEditModal(false);
          }}
          onTaskDeleted={() => {
            setShowEditModal(false);
            handleDelete();
          }}
        />
      )}
    </>
  );
}
