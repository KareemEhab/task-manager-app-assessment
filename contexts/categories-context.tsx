import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, useMemo } from "react";
import { Category } from "@/types/categories";
import { useTasksContext } from "./tasks-context";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Task } from "@/types/tasks";

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

type CategoriesContextType = {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const { tasks } = useTasksContext();
  const { user } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calculate categories from tasks optimistically
  const categories = useMemo(() => {
    if (!user || tasks.length === 0) {
      return [];
    }

    // Filter tasks assigned to the current user (exclude tasks created by me but assigned to others)
    const myTasks = tasks.filter((task) => {
      // If task has assignedTo, it must be assigned to me
      if (task.assignedTo) {
        const userEmailLower = user.email?.toLowerCase();
        const assignedToLower = task.assignedTo?.toLowerCase();
        return assignedToLower === userEmailLower;
      }
      
      // If no assignedTo, only include if created by me
      const isCreatedByMe = task.createdBy === user.name || task.createdBy === user.email;
      return isCreatedByMe;
    });

    // Group tasks by category
    const categoryMap = new Map<string, { total: number; completed: number }>();

    myTasks.forEach((task) => {
      task.categories.forEach((categoryName) => {
        const normalizedCategory = categoryName.trim();
        if (!normalizedCategory) return;

        const existing = categoryMap.get(normalizedCategory) || { total: 0, completed: 0 };
        existing.total += 1;
        if (task.status === "completed") {
          existing.completed += 1;
        }
        categoryMap.set(normalizedCategory, existing);
      });
    });

    // Convert to Category array
    const calculatedCategories: Category[] = Array.from(categoryMap.entries()).map(
      ([name, stats]) => ({
        id: name.toLowerCase().replace(/\s+/g, "-"),
        name: name,
        projectCount: stats.total,
        percentage: stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0,
        gradientColors: categoryGradients[name] || defaultGradient,
      })
    );

    // Sort by name for consistency
    return calculatedCategories.sort((a, b) => a.name.localeCompare(b.name));
  }, [tasks, user]);

  // Set loading to false once we have user or tasks
  useEffect(() => {
    if (user !== undefined) {
      setIsLoading(false);
    }
  }, [user]);

  // Refetch function (for compatibility, but categories are calculated from tasks)
  const refetch = useCallback(async () => {
    // Categories are calculated from tasks, so no need to refetch
    // This is kept for API compatibility
  }, []);

  const value: CategoriesContextType = {
    categories,
    isLoading,
    error,
    refetch,
  };

  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
}

export function useCategoriesContext() {
  const context = useContext(CategoriesContext);
  if (context === undefined) {
    throw new Error("useCategoriesContext must be used within a CategoriesProvider");
  }
  return context;
}
