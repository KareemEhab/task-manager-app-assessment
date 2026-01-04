import { useState, useEffect, useCallback } from "react";
import * as SecureStore from "expo-secure-store";
import { usersAPI } from "@/services/api";

export type CurrentUser = {
  _id: string;
  name: string;
  email: string;
};

export function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    // Check if user is authenticated
    const token = await SecureStore.getItemAsync("authToken");
    if (!token) {
      setIsLoading(false);
      setUser(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const userData = await usersAPI.getMe();
      setUser(userData);
    } catch (err: any) {
      // Don't show error if it's a 401 (unauthorized) - user just needs to log in
      if (err.response?.status === 401 || !err.response) {
        setUser(null);
        setError(null);
      } else {
        const errorMessage = err.response?.data || err.message || "Failed to fetch user";
        setError(errorMessage);
        console.error("Error fetching user:", err);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user,
    isLoading,
    error,
    refetch: fetchUser,
  };
}

