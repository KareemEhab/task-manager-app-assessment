import { useState, useEffect, useCallback } from "react";
import * as SecureStore from "expo-secure-store";
import { Task } from "@/data/tasks";
import { tasksAPI } from "@/services/api";
import { transformBackendTask } from "@/utils/task-transform";

export function useFetchTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    // Check if user is authenticated
    const token = await SecureStore.getItemAsync("authToken");
    if (!token) {
      setIsLoading(false);
      setTasks([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const backendTasks = await tasksAPI.getAll();
      const transformedTasks = backendTasks.map(transformBackendTask);
      setTasks(transformedTasks);
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

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    isLoading,
    error,
    refetch: fetchTasks,
  };
}

