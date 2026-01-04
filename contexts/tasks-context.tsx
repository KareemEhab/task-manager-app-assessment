import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, useMemo } from "react";
import * as SecureStore from "expo-secure-store";
import { Task } from "@/types/tasks";
import { Category } from "@/types/categories";
import { tasksAPI } from "@/services/api";
import { transformBackendTask } from "@/utils/task-transform";

// Gradient colors mapping for categories
const categoryGradients: Record<string, [string, string]> = {
  "Web Design": ["#667EEA", "#764BA2"],
  "Web Development": ["#3377FF", "#764BA2"],
  "Mobile App": ["#F093FB", "#F5576C"],
  "UI/UX": ["#4FACFE", "#00F2FE"],
  Marketing: ["#43E97B", "#38F9D7"],
  "Content Writing": ["#FA709A", "#FEE140"],
};

// Default gradient if category not found
const defaultGradient: [string, string] = ["#667EEA", "#764BA2"];

type TasksContextType = {
  tasks: Task[];
  categories: Category[];
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

  // Refetch function that always fetches, even if hasInitialLoad is true
  // This is used when we need to explicitly refresh tasks (e.g., after login)
  const refetchTasks = useCallback(async () => {
    const token = await SecureStore.getItemAsync("authToken");
    if (!token) {
      setTasks([]);
      setIsLoading(false);
      setHasInitialLoad(false);
      return;
    }

    // Don't refetch if already loading to prevent infinite loops
    setIsLoading(true);
    setError(null);

    try {
      const backendTasks = await tasksAPI.getAll();
      const transformedTasks = backendTasks.map(transformBackendTask);
      setTasks(transformedTasks);
      setHasInitialLoad(true);
    } catch (err: any) {
      if (err.response?.status === 401 || !err.response) {
        setTasks([]);
        setError(null);
        setHasInitialLoad(false);
      } else {
        const errorMessage = err.response?.data || err.message || "Failed to fetch tasks";
        setError(errorMessage);
        console.error("Error fetching tasks:", err);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Track previous token state to detect login/logout
  const [previousToken, setPreviousToken] = useState<string | null>(null);

  // Initial fetch when component mounts
  useEffect(() => {
    let isMounted = true;
    
    const loadTasks = async () => {
      if (!hasInitialLoad && isMounted) {
        const token = await SecureStore.getItemAsync("authToken");
        setPreviousToken(token);
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

  // Detect when token appears (user logs in) and refetch tasks
  useEffect(() => {
    const checkTokenChange = async () => {
      const currentToken = await SecureStore.getItemAsync("authToken");
      
      // If token appeared (user logged in) and we haven't loaded tasks yet, fetch them
      if (currentToken && !previousToken && hasInitialLoad && tasks.length === 0) {
        setPreviousToken(currentToken);
        setHasInitialLoad(false); // Reset to allow fetch
        await refetchTasks();
      } 
      // If token disappeared (user logged out), reset state
      else if (!currentToken && previousToken) {
        setPreviousToken(null);
        setTasks([]);
        setHasInitialLoad(false);
        setIsLoading(false);
      }
      // Update previous token if it changed
      else if (currentToken !== previousToken) {
        setPreviousToken(currentToken);
      }
    };

    // Check token changes periodically (but not too frequently)
    const intervalId = setInterval(checkTokenChange, 1000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [previousToken, hasInitialLoad, tasks.length, refetchTasks]);

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

  // Calculate categories from tasks (backend already filters tasks assigned to user)
  const categories = useMemo(() => {
    if (tasks.length === 0) {
      return [];
    }

    // Group tasks by category (no extra filtering - backend already filtered)
    const categoryMap = new Map<string, { total: number; completed: number }>();

    tasks.forEach((task) => {
      task.categories.forEach((categoryName) => {
        const normalizedCategory = categoryName.trim();
        if (!normalizedCategory) return;

        const existing = categoryMap.get(normalizedCategory) || {
          total: 0,
          completed: 0,
        };
        existing.total += 1;
        if (task.status === "completed") {
          existing.completed += 1;
        }
        categoryMap.set(normalizedCategory, existing);
      });
    });

    // Convert to Category array
    const calculatedCategories: Category[] = Array.from(
      categoryMap.entries()
    ).map(([name, stats]) => ({
      id: name.toLowerCase().replace(/\s+/g, "-"),
      name: name,
      projectCount: stats.total,
      percentage:
        stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0,
      gradientColors: categoryGradients[name] || defaultGradient,
    }));

    // Sort by name for consistency
    return calculatedCategories.sort((a, b) => a.name.localeCompare(b.name));
  }, [tasks]);

  // Clear tasks when user logs out
  const clearTasks = useCallback(() => {
    setTasks([]);
    setHasInitialLoad(false);
    setIsLoading(false);
  }, []);

  const value: TasksContextType = {
    tasks,
    categories,
    isLoading,
    error,
    addTask,
    updateTask,
    deleteTask,
    refetch: refetchTasks, // Use refetchTasks which always fetches
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
