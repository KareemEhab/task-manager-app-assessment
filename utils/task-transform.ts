import { Task } from "@/types/tasks";

// Backend task type (from MongoDB)
export type BackendTask = {
  _id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "upcoming" | "in-progress" | "in-review" | "completed";
  dueDate?: string | Date;
  categories: string[];
  assignedTo?: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  } | string;
  createdOn: string | Date;
  lastUpdated: string | Date;
  comments: Array<{
    _id?: string;
    name: string;
    comment: string;
    createdAt?: string | Date;
    deleted?: boolean;
  }>;
  done: boolean;
  deleted?: boolean;
};

// Transform backend task to frontend task format
export function transformBackendTask(backendTask: BackendTask): Task {
  return {
    id: backendTask._id,
    title: backendTask.title,
    description: backendTask.description || "",
    priority: backendTask.priority,
    status: backendTask.status,
    dueDate: backendTask.dueDate ? new Date(backendTask.dueDate) : undefined,
    categories: backendTask.categories,
    assignedTo: backendTask.assignedTo,
    createdBy:
      typeof backendTask.createdBy === "object"
        ? backendTask.createdBy.name
        : backendTask.createdBy,
    createdOn: new Date(backendTask.createdOn),
    lastUpdated: new Date(backendTask.lastUpdated),
    comments: (backendTask.comments || [])
      .filter((comment) => !comment.deleted)
      .map((comment) => ({
        _id: comment._id || (comment as any).id,
        name: comment.name,
        comment: comment.comment,
        createdAt: comment.createdAt ? new Date(comment.createdAt) : new Date(),
      })),
  };
}

// Transform frontend task to backend task format
// Only includes fields that are actually provided (for partial updates)
export function transformFrontendTask(task: Partial<Task>): any {
  const backendTask: any = {};

  // Only include fields that are explicitly provided
  // Note: We don't send 'done' field - backend should derive it from status
  if (task.title !== undefined) backendTask.title = task.title;
  if (task.description !== undefined) backendTask.description = task.description || "";
  if (task.priority !== undefined) backendTask.priority = task.priority;
  if (task.status !== undefined) backendTask.status = task.status;
  if (task.categories !== undefined) backendTask.categories = task.categories;

  if (task.dueDate !== undefined) {
    backendTask.dueDate = task.dueDate instanceof Date ? task.dueDate.toISOString() : task.dueDate;
  }

  if (task.assignedTo !== undefined) {
    backendTask.assignedTo = task.assignedTo;
  }

  if (task.comments !== undefined) {
    backendTask.comments = task.comments;
  }

  return backendTask;
}

