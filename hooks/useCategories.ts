import { useTasksContext } from "@/contexts/tasks-context";

// This hook now uses the TasksContext for categories
export function useCategories() {
  const { categories, isLoading, error } = useTasksContext();
  return {
    categories,
    isLoading,
    error,
  };
}

