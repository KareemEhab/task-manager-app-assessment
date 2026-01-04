import { useTasksContext } from "@/contexts/tasks-context";

// This hook now just wraps the context for backward compatibility
export function useFetchTasks() {
  const context = useTasksContext();
  return {
    tasks: context.tasks,
    isLoading: context.isLoading,
    error: context.error,
    refetch: context.refetch,
  };
}

