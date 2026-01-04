import axios from "axios";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

// Get API URL from config, ensuring it doesn't have trailing slash
const rawApiUrl =
  Constants.expoConfig?.extra?.apiUrl || "http://localhost:3000/api";
const API_URL = rawApiUrl.endsWith("/") ? rawApiUrl.slice(0, -1) : rawApiUrl;

// Log the API URL being used
console.log(`[API Config] Using API URL: ${API_URL}`);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include JWT token
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("authToken");
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    // Log the full URL for debugging
    console.log(
      `[API Request] ${config.method?.toUpperCase()} ${config.baseURL}${
        config.url
      }`
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Log detailed error information
    if (error.response) {
      console.error(
        `[API Error] ${error.config?.method?.toUpperCase()} ${
          error.config?.url
        } - Status: ${error.response.status}`
      );
      console.error(`[API Error] Response:`, error.response.data);
      console.error(
        `[API Error] Full URL: ${error.config?.baseURL}${error.config?.url}`
      );
    } else if (error.request) {
      console.error(
        `[API Error] No response received for ${error.config?.method?.toUpperCase()} ${
          error.config?.baseURL
        }${error.config?.url}`
      );
    } else {
      console.error(`[API Error]`, error.message);
    }

    if (error.response?.status === 401) {
      // Token expired or invalid, clear it
      await SecureStore.deleteItemAsync("authToken");
    }

    // Handle network errors (e.g., connection refused, timeout)
    if (!error.response && error.message) {
      // Network error - could be server not running or wrong URL
      console.error("Network error:", error.message);
      // Don't clear token on network errors, just reject
    }

    return Promise.reject(error);
  }
);

export const authAPI = {
  signIn: async (email: string, password: string) => {
    try {
      const response = await api.post("/api/auth", { email, password });
      // Auth endpoint returns token as string
      return response.data;
    } catch (error: any) {
      // Provide helpful error message for network errors
      if (!error.response) {
        console.error(`Network Error: Cannot connect to ${API_URL}`);
        console.error("Make sure:");
        console.error("1. Backend server is running on port 3000");
        console.error(
          "2. If using device/emulator, use your machine's IP instead of localhost"
        );
        console.error(`   Current API URL: ${API_URL}`);
        throw new Error(
          `Cannot connect to server at ${API_URL}. Make sure the backend is running and accessible.`
        );
      }
      throw error;
    }
  },
  signUp: async (name: string, email: string, password: string) => {
    try {
      const response = await api.post("/api/users", { name, email, password });
      // Users endpoint returns { token, user }
      return response.data;
    } catch (error: any) {
      // Provide helpful error message for network errors
      if (!error.response) {
        console.error(`Network Error: Cannot connect to ${API_URL}`);
        console.error("Make sure:");
        console.error("1. Backend server is running on port 3000");
        console.error(
          "2. If using device/emulator, use your machine's IP instead of localhost"
        );
        console.error(`   Current API URL: ${API_URL}`);
        throw new Error(
          `Cannot connect to server at ${API_URL}. Make sure the backend is running and accessible.`
        );
      }
      throw error;
    }
  },
};

export const tasksAPI = {
  getAll: async () => {
    const response = await api.get("/api/tasks");
    return response.data;
  },
  getCreatedByMe: async () => {
    const response = await api.get("/api/tasks/created-by-me");
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/api/tasks/${id}`);
    return response.data;
  },
  create: async (task: any) => {
    const response = await api.post("/api/tasks", task);
    return response.data;
  },
  update: async (id: string, updates: any) => {
    const response = await api.put(`/api/tasks/${id}`, updates);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/api/tasks/${id}`);
    return response.data;
  },
};

export const categoriesAPI = {
  getAll: async () => {
    const response = await api.get("/api/tasks/categories");
    return response.data;
  },
};

export const usersAPI = {
  getMe: async () => {
    const response = await api.get("/api/users/me");
    return response.data;
  },
};

export const commentsAPI = {
  add: async (taskId: string, comment: string) => {
    const response = await api.post(`/api/tasks/${taskId}/comments`, {
      comment,
    });
    return response.data;
  },
  delete: async (taskId: string, commentId: string) => {
    const response = await api.delete(
      `/api/tasks/${taskId}/comments/${commentId}`
    );
    return response.data;
  },
};

export default api;
