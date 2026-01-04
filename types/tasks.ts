export type TaskStatus = "upcoming" | "in-progress" | "in-review" | "completed";

export type TaskPriority = "low" | "medium" | "high";

export type TaskComment = {
  _id?: string;
  name: string;
  comment: string;
  createdAt?: Date;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: Date;
  categories: string[];
  assignedTo?: string;
  createdBy: string;
  createdOn: Date;
  lastUpdated: Date;
  comments: TaskComment[];
};
