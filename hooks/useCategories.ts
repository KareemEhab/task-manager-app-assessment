import { useCategoriesContext } from "@/contexts/categories-context";

// This hook now uses the CategoriesContext for optimistic updates
export function useCategories() {
  const { categories, isLoading, error, refetch } = useCategoriesContext();
  return {
    categories,
    isLoading,
    error,
    refetch,
  };
}

