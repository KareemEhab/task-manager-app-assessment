import { useState } from "react";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { authAPI } from "@/services/api";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = await authAPI.signIn(email, password);
      
      // Store JWT token securely
      await SecureStore.setItemAsync("authToken", token);
      
      // Small delay to ensure token is stored before navigation
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Reset navigation stack - dismiss all previous screens and navigate to tabs
      // This ensures there's no back history to onboarding
      router.dismissAll();
      router.replace("/(tabs)");
      
      return { success: true };
    } catch (err: any) {
      const errorMessage = err.response?.data || err.message || "Failed to sign in";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authAPI.signUp(name, email, password);
      
      // Sign-up endpoint returns { token, user }
      const token = response.token || response;
      await SecureStore.setItemAsync("authToken", token);
      
      // Small delay to ensure token is stored before navigation
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Reset navigation stack - dismiss all previous screens and navigate to tabs
      // This ensures there's no back history to onboarding
      router.dismissAll();
      router.replace("/(tabs)");
      
      return { success: true };
    } catch (err: any) {
      const errorMessage = err.response?.data || err.message || "Failed to sign up";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await SecureStore.deleteItemAsync("authToken");
      // Use replace to prevent going back to the previous screen
      router.replace("/sign-in");
    } catch (err) {
      console.error("Failed to sign out:", err);
      // Still navigate even if there's an error
      router.replace("/sign-in");
    }
  };

  const getToken = async (): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync("authToken");
    } catch (err) {
      console.error("Failed to get token:", err);
      return null;
    }
  };

  return {
    signIn,
    signUp,
    signOut,
    getToken,
    isLoading,
    error,
  };
}

