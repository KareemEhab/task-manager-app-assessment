import { useState, useEffect, useCallback } from "react";
import * as SecureStore from "expo-secure-store";
import { Category } from "@/types/categories";
import { categoriesAPI } from "@/services/api";

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

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchCategories = useCallback(async () => {
    // Check if user is authenticated
    const token = await SecureStore.getItemAsync("authToken");
    if (!token) {
      setIsLoading(false);
      setCategories([]);
      setHasLoaded(true);
      return;
    }

    // Only show loading if we haven't loaded before
    if (!hasLoaded) {
      setIsLoading(true);
    }
    setError(null);

    try {
      const backendCategories = await categoriesAPI.getAll();
      
      // Transform backend categories to frontend format
      const transformedCategories: Category[] = backendCategories.map((cat: any, index: number) => ({
        id: cat.name.toLowerCase().replace(/\s+/g, "-"),
        name: cat.name,
        projectCount: cat.projectCount,
        percentage: cat.percentage,
        gradientColors: categoryGradients[cat.name] || defaultGradient,
      }));

      setCategories(transformedCategories);
      setHasLoaded(true);
    } catch (err: any) {
      // Don't show error if it's a 401 (unauthorized) or network error when not authenticated
      if (err.response?.status === 401 || !err.response) {
        setCategories([]);
        setError(null);
      } else {
        const errorMessage = err.response?.data || err.message || "Failed to fetch categories";
        setError(errorMessage);
        console.error("Error fetching categories:", err);
      }
      setHasLoaded(true);
    } finally {
      setIsLoading(false);
    }
  }, [hasLoaded]);

  useEffect(() => {
    // Only fetch on initial mount if not already loaded
    if (!hasLoaded) {
      fetchCategories();
    }
  }, []); // Empty dependency array - only run once

  return {
    categories,
    isLoading: isLoading && !hasLoaded, // Only show loading if we haven't loaded before
    error,
    refetch: fetchCategories,
  };
}

