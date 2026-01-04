import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useEffect, useState } from "react";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BottomDrawer } from "@/components/common/bottom-drawer/bottom-drawer";
import { Button } from "@/components/common/button/button";
import { DeleteTaskModal } from "@/components/modals/delete-task-modal";
import {
  CommonColors,
  DarkColors,
  LightColors,
  TextColors,
} from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import {
  deleteTask as deleteTaskFromData,
  updateTask,
} from "@/data/task-manager";
import { Task } from "@/data/tasks";
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
  const insets = useSafeAreaInsets();
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    dueDate: null,
    priority: "low",
    status: "upcoming",
    categories: [],
  });
  const [errors, setErrors] = useState<TaskFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
      });
      setErrors({});
    }
  }, [task, visible]);

  const handleClose = () => {
    if (isLoading) return;
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

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      updateTask(task.id, {
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
        status: formData.status,
        dueDate: formData.dueDate!,
        categories: formData.categories,
        lastUpdated: new Date(),
      });

      setIsLoading(false);
      handleClose();
      onTaskUpdated();
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to update task:", error);
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!task) return;
    setIsDeleting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      deleteTaskFromData(task.id);
      setIsDeleting(false);
      setShowDeleteModal(false);
      handleClose();
      onTaskDeleted();
    } catch (error) {
      setIsDeleting(false);
      console.error("Failed to delete task:", error);
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
                title="Update Task"
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
