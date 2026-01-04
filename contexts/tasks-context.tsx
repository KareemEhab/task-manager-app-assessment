import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import * as SecureStore from "expo-secure-store";
import { Task } from "@/types/tasks";
import { tasksAPI } from "@/services/api";
import { transformBackendTask } from "@/utils/task-transform";

type TasksContextType = {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  // Methods to update tasks optimistically
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  // Method to refetch from server (only when needed)
  refetch: () => Promise<void>;
  // Method to get a single task by ID
  getTaskById: (taskId: string) => Task | undefined;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasInitialLoad, setHasInitialLoad] = useState(false);

  const fetchTasks = useCallback(async () => {
    // Check if user is authenticated
    const token = await SecureStore.getItemAsync("authToken");
    if (!token) {
      setIsLoading(false);
      setTasks([]);
      setHasInitialLoad(true);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const backendTasks = await tasksAPI.getAll();
      const transformedTasks = backendTasks.map(transformBackendTask);
      setTasks(transformedTasks);
      setHasInitialLoad(true);
    } catch (err: any) {
      // Don't show error if it's a 401 (unauthorized) or network error when not authenticated
      if (err.response?.status === 401 || !err.response) {
        setTasks([]);
        setError(null);
      } else {
        const errorMessage = err.response?.data || err.message || "Failed to fetch tasks";
        setError(errorMessage);
        console.error("Error fetching tasks:", err);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch when component mounts - only run once
  useEffect(() => {
    let isMounted = true;
    
    const loadTasks = async () => {
      if (!hasInitialLoad && isMounted) {
        const token = await SecureStore.getItemAsync("authToken");
        if (token) {
          await fetchTasks();
        } else {
          if (isMounted) {
            setIsLoading(false);
            setHasInitialLoad(true);
          }
        }
      }
    };
    
    loadTasks();
    
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array - only run once on mount

  // Optimistic update: Add task to local state immediately
  const addTask = useCallback((task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  }, []);

  // Optimistic update: Update task in local state immediately
  const updateTask = useCallback((taskId: string, updates: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    );
  }, []);

  // Optimistic update: Remove task from local state immediately
  const deleteTask = useCallback((taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, []);

  // Get a single task by ID
  const getTaskById = useCallback((taskId: string) => {
    return tasks.find((task) => task.id === taskId);
  }, [tasks]);

  // Clear tasks when user logs out
  const clearTasks = useCallback(() => {
    setTasks([]);
    setHasInitialLoad(false);
    setIsLoading(false);
  }, []);

  const value: TasksContextType = {
    tasks,
    isLoading,
    error,
    addTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks,
    getTaskById,
  };

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasksContext() {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTasksContext must be used within a TasksProvider");
  }
  return context;
}
