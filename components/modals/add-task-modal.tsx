import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import type { ComponentRef } from "react";
import { useRef, useState } from "react";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BottomDrawer } from "@/components/common/bottom-drawer/bottom-drawer";
import { Button } from "@/components/common/button/button";
import { Toast } from "@/components/common/toast";
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

type AddTaskModalProps = {
  visible: boolean;
  onClose: () => void;
  onTaskAdded: () => void;
};

export function AddTaskModal({
  visible,
  onClose,
  onTaskAdded,
}: AddTaskModalProps) {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
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
  const [showToast, setShowToast] = useState(false);

  const { createTask } = useTasks({
    onSuccess: () => {
      handleClose();
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        onTaskAdded();
      }, 2000);
    },
  });

  const styles = getStyles(isDark);

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      dueDate: null,
      priority: "low",
      status: "upcoming",
      categories: [],
      assignedTo: "",
    });
    setErrors({});
    onClose();
  };

  const handleFieldChange = (field: keyof TaskFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    const validationErrors = validateTaskForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const newTask: Task = {
      id: "", // Will be set by backend
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      status: formData.status,
      dueDate: formData.dueDate!,
      categories: formData.categories,
      assignedTo: formData.assignedTo?.trim() || undefined,
      createdBy: "You", // Will be set by backend
      createdOn: new Date(),
      lastUpdated: new Date(),
      comments: [],
    };

    await createTask(newTask);
  };

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
            <Text style={styles.title}>Create New Task</Text>

            <View style={styles.buttonRow}>
              <Button
                variant="cancel"
                title="Cancel"
                onPress={handleClose}
                style={styles.cancelButton}
              />
              <Button
                variant="primary"
                title="Create Task"
                onPress={handleSubmit}
                style={styles.createButton}
              />
            </View>
          </View>

          <View style={styles.formContent}>
            <TaskFormFields
              formData={formData}
              errors={errors}
              onFieldChange={handleFieldChange}
              minimumDate={new Date()}
              scrollViewRef={scrollViewRef}
            />
          </View>
        </BottomSheetScrollView>
      </BottomDrawer>

      <Toast
        visible={showToast}
        message="Task was created successfully"
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
    cancelButton: {
      flex: 1,
    },
    createButton: {
      flex: 1,
    },
  });
