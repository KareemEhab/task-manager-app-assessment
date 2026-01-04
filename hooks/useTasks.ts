import { useState } from "react";

import { useTasksContext } from "@/contexts/tasks-context";
import { commentsAPI, tasksAPI } from "@/services/api";
import { Task, TaskComment } from "@/types/tasks";
import {
  transformBackendTask,
  transformFrontendTask,
} from "@/utils/task-transform";

type UseTasksOptions = {
  onTaskUpdate?: (taskId: string, updates: Partial<Task>) => void;
  onTaskDelete?: (taskId: string) => void;
  onSuccess?: () => void;
};

export function useTasks({
  onTaskUpdate,
  onTaskDelete,
  onSuccess,
}: UseTasksOptions = {}) {
  const {
    updateTask: updateTaskInContext,
    deleteTask: deleteTaskInContext,
    addTask: addTaskInContext,
    getTaskById,
  } = useTasksContext();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isMarkingDone, setIsMarkingDone] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(
    null
  );

  const markTaskAsDone = async (task: Task) => {
    setIsMarkingDone(true);

    // Optimistic update: Update context immediately
    const previousTask = { ...task };
    updateTaskInContext(task.id, {
      status: "completed",
      lastUpdated: new Date(),
    });
    if (onTaskUpdate) {
      onTaskUpdate(task.id, {
        status: "completed",
        lastUpdated: new Date(),
      });
    }

    try {
      const updatedTask = await tasksAPI.update(task.id, {
        status: "completed",
      });

      const transformedTask = transformBackendTask(updatedTask);
      // Update with server response
      updateTaskInContext(task.id, {
        status: "completed",
        lastUpdated: transformedTask.lastUpdated,
      });
      if (onTaskUpdate) {
        onTaskUpdate(task.id, {
          status: "completed",
          lastUpdated: transformedTask.lastUpdated,
        });
      }

      setIsMarkingDone(false);
      setToastMessage("Task was successfully marked as done");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);

      // Categories will update automatically via CategoriesContext when task status changes
      // No need to call onCategoriesUpdate anymore
    } catch (error: any) {
      // Rollback optimistic update on error
      updateTaskInContext(task.id, previousTask);
      if (onTaskUpdate) {
        onTaskUpdate(task.id, previousTask);
      }
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

    // Optimistic update: Remove from context immediately
    const taskToDelete = getTaskById(taskId);
    deleteTaskInContext(taskId);
    if (onTaskDelete) {
      onTaskDelete(taskId);
    }

    try {
      await tasksAPI.delete(taskId);
      setIsDeleting(false);
      setToastMessage("Task was successfully deleted");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (error: any) {
      // Rollback optimistic update on error - need to add task back
      if (taskToDelete) {
        addTaskInContext(taskToDelete);
      }
      setIsDeleting(false);
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
      const createdTask = await tasksAPI.create(taskData);
      const transformedTask = transformBackendTask(createdTask);

      // Add to context after successful creation
      addTaskInContext(transformedTask);

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
    // Get current task for rollback
    const currentTask = getTaskById(taskId);
    const previousTask = currentTask ? { ...currentTask } : null;

    // Check if status is changing to/from completed (affects category percentages)
    const wasCompleted = currentTask?.status === "completed";
    const isChangingToCompleted =
      updates.status === "completed" && !wasCompleted;
    const isChangingFromCompleted =
      wasCompleted && updates.status && updates.status !== "completed";
    const statusChanged = isChangingToCompleted || isChangingFromCompleted;

    // Optimistic update: Update context immediately
    updateTaskInContext(taskId, {
      ...updates,
      lastUpdated: new Date(),
    });
    if (onTaskUpdate) {
      onTaskUpdate(taskId, {
        ...updates,
        lastUpdated: new Date(),
      });
    }

    try {
      const updateData = transformFrontendTask(updates);
      const updatedTask = await tasksAPI.update(taskId, updateData);
      const transformedTask = transformBackendTask(updatedTask);

      // Update with server response
      updateTaskInContext(taskId, {
        ...updates,
        lastUpdated: transformedTask.lastUpdated,
      });
      if (onTaskUpdate) {
        onTaskUpdate(taskId, {
          ...updates,
          lastUpdated: transformedTask.lastUpdated,
        });
      }

      // Categories will update automatically via CategoriesContext when task status changes
      // No need to call onCategoriesUpdate anymore

      setToastMessage("Task was updated successfully");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (error) {
      // Rollback optimistic update on error
      if (previousTask) {
        updateTaskInContext(taskId, previousTask);
        if (onTaskUpdate) {
          onTaskUpdate(taskId, previousTask);
        }
      }
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

    // Optimistic update: Add comment immediately
    const tempComment: TaskComment = {
      _id: `temp-${Date.now()}`,
      name: "You", // Will be replaced by server response
      comment: comment.trim(),
      createdAt: new Date(),
    };
    const optimisticComments = [...currentComments, tempComment];
    updateTaskInContext(taskId, {
      comments: optimisticComments,
      lastUpdated: new Date(),
    });
    if (onTaskUpdate) {
      onTaskUpdate(taskId, {
        comments: optimisticComments,
        lastUpdated: new Date(),
      });
    }

    try {
      const updatedTask = await commentsAPI.add(taskId, comment);
      const transformedTask = transformBackendTask(updatedTask);

      // Update with server response
      updateTaskInContext(taskId, {
        comments: transformedTask.comments,
        lastUpdated: transformedTask.lastUpdated,
      });
      if (onTaskUpdate) {
        onTaskUpdate(taskId, {
          comments: transformedTask.comments,
          lastUpdated: transformedTask.lastUpdated,
        });
      }
    } catch (error) {
      // Rollback optimistic update on error
      updateTaskInContext(taskId, {
        comments: currentComments,
      });
      if (onTaskUpdate) {
        onTaskUpdate(taskId, {
          comments: currentComments,
        });
      }
      console.error("Failed to add comment:", error);
      throw error;
    }
  };

  const deleteComment = async (
    taskId: string,
    commentIndex: number,
    currentComments: TaskComment[]
  ) => {
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

    // Optimistic update: Remove comment immediately
    const optimisticComments = currentComments.filter(
      (_, idx) => idx !== commentIndex
    );
    setDeletingCommentId(commentId);
    updateTaskInContext(taskId, {
      comments: optimisticComments,
      lastUpdated: new Date(),
    });
    if (onTaskUpdate) {
      onTaskUpdate(taskId, {
        comments: optimisticComments,
        lastUpdated: new Date(),
      });
    }

    try {
      const updatedTask = await commentsAPI.delete(taskId, commentId);
      const transformedTask = transformBackendTask(updatedTask);

      // Update with server response
      updateTaskInContext(taskId, {
        comments: transformedTask.comments,
        lastUpdated: transformedTask.lastUpdated,
      });
      if (onTaskUpdate) {
        onTaskUpdate(taskId, {
          comments: transformedTask.comments,
          lastUpdated: transformedTask.lastUpdated,
        });
      }
      setDeletingCommentId(null);
    } catch (error) {
      // Rollback optimistic update on error
      updateTaskInContext(taskId, {
        comments: currentComments,
      });
      if (onTaskUpdate) {
        onTaskUpdate(taskId, {
          comments: currentComments,
        });
      }
      setDeletingCommentId(null);
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
