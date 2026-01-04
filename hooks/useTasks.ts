import { useState } from "react";

import { Task, TaskComment } from "@/data/tasks";
import { commentsAPI, tasksAPI } from "@/services/api";
import {
  transformBackendTask,
  transformFrontendTask,
} from "@/utils/task-transform";

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
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(
    null
  );

  const markTaskAsDone = async (task: Task) => {
    setIsMarkingDone(true);

    try {
      const updatedTask = await tasksAPI.update(task.id, {
        status: "completed",
      });

      const transformedTask = transformBackendTask(updatedTask);
      onTaskUpdate(task.id, {
        status: "completed",
        lastUpdated: transformedTask.lastUpdated,
      });

      setIsMarkingDone(false);
      setToastMessage("Task was successfully marked as done");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (error: any) {
      setIsMarkingDone(false);
      const errorMessage =
        error.response?.data || error.message || "Failed to mark task as done";
      console.error("Error marking task as done:", errorMessage, error);
      setToastMessage(errorMessage);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
  };

  const deleteTask = async (taskId: string) => {
    setIsDeleting(true);

    try {
      await tasksAPI.delete(taskId);
      // Only call onTaskDelete if deletion was successful
      setIsDeleting(false);
      // Set toast message BEFORE calling callback so it's visible
      setToastMessage("Task was successfully deleted");
      setShowToast(true);
      // Call callback after toast is set
      onTaskDelete(taskId);
      // Toast will be shown by the caller, but also show it here as fallback
    } catch (error: any) {
      setIsDeleting(false);
      // Don't call onTaskDelete if deletion failed
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Failed to delete task";
      console.error("Error deleting task:", errorMessage, error);
      setToastMessage(errorMessage);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
      // Re-throw error so caller can handle it
      throw error;
    }
  };

  const createTask = async (task: Task) => {
    try {
      const taskData = transformFrontendTask(task);
      await tasksAPI.create(taskData);
      setToastMessage("Task was created successfully");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setToastMessage("Failed to create task");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
  };

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    try {
      const updateData = transformFrontendTask(updates);
      const updatedTask = await tasksAPI.update(taskId, updateData);
      const transformedTask = transformBackendTask(updatedTask);
      onTaskUpdate(taskId, {
        ...updates,
        lastUpdated: transformedTask.lastUpdated,
      });
      setToastMessage("Task was updated successfully");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (error) {
      setToastMessage("Failed to update task");
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

    try {
      const updatedTask = await commentsAPI.add(taskId, comment);
      const transformedTask = transformBackendTask(updatedTask);

      onTaskUpdate(taskId, {
        comments: transformedTask.comments,
        lastUpdated: transformedTask.lastUpdated,
      });
    } catch (error) {
      console.error("Failed to add comment:", error);
      throw error;
    }
  };

  const deleteComment = async (
    taskId: string,
    commentIndex: number,
    currentComments: TaskComment[]
  ) => {
    try {
      // Get the comment ID from the current comments
      const commentToDelete = currentComments[commentIndex];
      if (!commentToDelete || !(commentToDelete as any)._id) {
        throw new Error("Comment not found");
      }

      const commentId = (commentToDelete as any)._id;

      // Prevent double calls by checking if this specific comment is already being deleted
      if (deletingCommentId === commentId) {
        console.warn("Comment deletion already in progress for this comment");
        return;
      }

      setDeletingCommentId(commentId); // Track which comment is being deleted
      const updatedTask = await commentsAPI.delete(taskId, commentId);
      const transformedTask = transformBackendTask(updatedTask);

      onTaskUpdate(taskId, {
        comments: transformedTask.comments,
        lastUpdated: transformedTask.lastUpdated,
      });
      setDeletingCommentId(null); // Clear tracking
    } catch (error) {
      setDeletingCommentId(null); // Clear tracking on error
      console.error("Failed to delete comment:", error);
      throw error;
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
    createTask,
    updateTask,
  };
}
