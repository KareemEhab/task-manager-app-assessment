import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import type { ComponentRef } from "react";
import { useEffect, useRef, useState } from "react";
import { Keyboard, StyleSheet, Text, View } from "react-native";

import { BottomDrawer } from "@/components/common/bottom-drawer/bottom-drawer";
import { Button } from "@/components/common/button/button";
import { Toast } from "@/components/common/toast";
import { DeleteTaskModal } from "@/components/modals/delete-task-modal";
import {
  CommonColors,
  DarkColors,
  LightColors,
  TextColors,
} from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/types/tasks";
import {
  TaskFormData,
  TaskFormErrors,
  validateTaskForm,
} from "@/utils/task-validation";
import { TaskFormFields } from "./task-form/task-form-fields";

type EditTaskModalProps = {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
  onTaskUpdated: () => void;
  onTaskDeleted: () => void;
};

export function EditTaskModal({
  visible,
  task,
  onClose,
  onTaskUpdated,
  onTaskDeleted,
}: EditTaskModalProps) {
  const { isDark } = useTheme();
  const scrollViewRef =
    useRef<ComponentRef<typeof BottomSheetScrollView>>(null);
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    dueDate: null,
    priority: "low",
    status: "upcoming",
    categories: [],
    assignedTo: "",
  });
  const [errors, setErrors] = useState<TaskFormErrors>({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    updateTask,
    deleteTask,
    isDeleting,
    isMarkingDone,
    showToast,
    toastMessage,
    setShowToast,
  } = useTasks({
    onTaskUpdate: () => {
      handleClose();
      onTaskUpdated();
    },
    onTaskDelete: () => {
      // Only close modal if deletion was successful
      setShowDeleteModal(false);
      // Delay closing the modal to allow toast to be visible
      // Toast is set in the deleteTask hook, so we wait for it to show
      setTimeout(() => {
        handleClose();
        onTaskDeleted();
      }, 1500); // Give enough time for toast to be visible
    },
    onSuccess: () => {},
  });

  const isLoading = isMarkingDone;

  const styles = getStyles(isDark);

  useEffect(() => {
    if (task && visible) {
      setFormData({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate || null,
        priority: task.priority,
        status: task.status,
        categories: task.categories,
        assignedTo: task.assignedTo || "",
      });
      setErrors({});
    }
  }, [task, visible]);

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  const handleFieldChange = (field: keyof TaskFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!task) return;

    Keyboard.dismiss();
    const validationErrors = validateTaskForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    await updateTask(task.id, {
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      status: formData.status,
      dueDate: formData.dueDate!,
      categories: formData.categories,
      assignedTo: formData.assignedTo?.trim() || undefined,
    });
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!task) return;
    try {
      // Delete the task (this sets loading state and toast message)
      // Use task.id directly - it should be the MongoDB _id from the backend
      await deleteTask(task.id);
      // Modal will be closed by onTaskDelete callback if deletion succeeds
      // No need to handle success here - onTaskDelete callback handles it
    } catch (error: any) {
      // Error handling is done in deleteTask hook
      // The toast will be shown by the deleteTask hook
      // Don't show error here - let the hook handle it silently
      // Modal stays open if deletion fails so user can try again
      console.error("Delete failed in EditTaskModal:", error);
    }
  };

  if (!task) return null;

  return (
    <>
      <BottomDrawer
        visible={visible}
        onClose={handleClose}
        snapPoints={["60%", "95%"]}
      >
        <BottomSheetScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollContent]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={true}
          scrollEventThrottle={16}
          bounces
          stickyHeaderIndices={[0]}
        >
          <View style={styles.stickyHeader}>
            <Text style={styles.title}>Edit Task</Text>

            <View style={styles.buttonRow}>
              <Button
                variant="cancel"
                title="Cancel"
                onPress={handleClose}
                style={styles.cancelButton}
                disabled={isLoading}
              />
              <Button
                variant="danger"
                title="Delete"
                onPress={handleDelete}
                style={styles.deleteButton}
                disabled={isLoading}
              />
              <Button
                variant="primary"
                title="Update"
                onPress={handleSubmit}
                style={styles.updateButton}
                loading={isLoading}
                disabled={isLoading}
              />
            </View>
          </View>

          <View style={styles.formContent}>
            <TaskFormFields
              formData={formData}
              errors={errors}
              onFieldChange={handleFieldChange}
              minimumDate={task.createdOn || new Date()}
              scrollViewRef={scrollViewRef}
            />
          </View>
        </BottomSheetScrollView>
      </BottomDrawer>

      <DeleteTaskModal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />

      <Toast
        visible={showToast}
        message={toastMessage}
        onHide={() => setShowToast(false)}
      />
    </>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    stickyHeader: {
      paddingHorizontal: 24,
      paddingTop: 16,
      paddingBottom: 16,
      // Match drawer background for consistent contrast
      backgroundColor: isDark ? DarkColors.darkBackground : LightColors.light4,
      zIndex: 5000,
      elevation: 5000,
    },
    title: {
      fontSize: 24,
      fontWeight: "600",
      color: isDark ? CommonColors.white : TextColors.primary,
      marginBottom: 10,
    },
    buttonRow: {
      flexDirection: "row",
      gap: 12,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? DarkColors.dark3 : LightColors.lightBorder,
    },
    scrollView: {
      flex: 1,
      minHeight: 0,
    },
    scrollContent: {
      paddingBottom: 0,
    },
    formContent: {
      paddingHorizontal: 24,
      paddingTop: 16,
    },
    deleteButton: {
      flex: 1,
    },
    cancelButton: {
      flex: 1,
    },
    updateButton: {
      flex: 1,
    },
  });
