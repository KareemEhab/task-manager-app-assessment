import { TaskPriority, TaskStatus } from "@/types/tasks";

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export type TaskFormData = {
  title: string;
  description: string;
  dueDate: Date | null;
  priority: TaskPriority;
  status: TaskStatus;
  categories: string[];
  assignedTo?: string;
};

export type TaskFormErrors = {
  title?: string;
  description?: string;
  dueDate?: string;
  priority?: string;
  status?: string;
  categories?: string;
  assignedTo?: string;
};

export function validateTaskForm(data: TaskFormData): TaskFormErrors {
  const errors: TaskFormErrors = {};

  // Task Title: required, min 3, max 50
  if (!data.title || data.title.trim().length === 0) {
    errors.title = "Task title is required";
  } else if (data.title.trim().length < 3) {
    errors.title = "Task title must be at least 3 characters";
  } else if (data.title.trim().length > 50) {
    errors.title = "Task title must be at most 50 characters";
  }

  // Description: optional, max 500 characters
  if (data.description && data.description.length > 500) {
    errors.description = "Description must be at most 500 characters";
  }

  // Due Date: required, today or after
  if (!data.dueDate) {
    errors.dueDate = "Due date is required";
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(data.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    if (dueDate < today) {
      errors.dueDate = "Due date must be today or later";
    }
  }

  // Priority: required
  if (!data.priority) {
    errors.priority = "Priority is required";
  }

  // Status: required
  if (!data.status) {
    errors.status = "Status is required";
  }

  // Categories: at least one required
  if (!data.categories || data.categories.length === 0) {
    errors.categories = "At least one category is required";
  }

  // Assigned To: optional, but if provided must be valid email
  if (data.assignedTo && data.assignedTo.trim().length > 0) {
    if (!isValidEmail(data.assignedTo.trim())) {
      errors.assignedTo = "Please enter a valid email address";
    }
  }

  return errors;
}


