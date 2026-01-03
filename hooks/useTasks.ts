import { useState } from "react";

import { Task, TaskComment } from "@/data/tasks";

type UseTasksOptions = {
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
  onTaskDelete: (taskId: string) => void;
  onSuccess?: () => void;
};

export function useTasks({
  onTaskUpdate,
  onTaskDelete,
  onSuccess,
}: UseTasksOptions) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isMarkingDone, setIsMarkingDone] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const markTaskAsDone = async (task: Task) => {
    setIsMarkingDone(true);

    try {
      // TODO: Replace with actual API call
      // const response = await api.markTaskAsDone(task.id);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      onTaskUpdate(task.id, {
        done: true,
        status: "completed",
        lastUpdated: new Date(),
      });

      setIsMarkingDone(false);
      setToastMessage("Task was successfully marked as done");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (error) {
      setIsMarkingDone(false);
      setToastMessage("Failed to mark task as done");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
  };

  const deleteTask = async (taskId: string) => {
    setIsDeleting(true);

    try {
      // TODO: Replace with actual API call
      // const response = await api.deleteTask(taskId);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      onTaskDelete(taskId);
      setIsDeleting(false);
      setToastMessage("Task was successfully deleted");
      // Toast will be shown by the caller after navigation
    } catch (error) {
      setIsDeleting(false);
      setToastMessage("Failed to delete task");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
  };

  const addComment = async (
    taskId: string,
    comment: string,
    currentComments: TaskComment[]
  ) => {
    if (!comment.trim()) return;

    const newComment: TaskComment = {
      name: "You", // TODO: Get from auth context
      comment: comment.trim(),
    };

    try {
      // TODO: Replace with actual API call
      // const response = await api.addComment(taskId, newComment);
      await new Promise((resolve) => setTimeout(resolve, 300));

      onTaskUpdate(taskId, {
        comments: [...currentComments, newComment],
        lastUpdated: new Date(),
      });
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const deleteComment = async (
    taskId: string,
    commentIndex: number,
    currentComments: TaskComment[]
  ) => {
    try {
      // TODO: Replace with actual API call
      // const response = await api.deleteComment(taskId, commentIndex);
      await new Promise((resolve) => setTimeout(resolve, 300));

      const updatedComments = currentComments.filter(
        (_, i) => i !== commentIndex
      );
      onTaskUpdate(taskId, {
        comments: updatedComments,
        lastUpdated: new Date(),
      });
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return {
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
  };
}

