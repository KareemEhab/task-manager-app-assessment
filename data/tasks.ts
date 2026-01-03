export type TaskStatus = "upcoming" | "in-progress" | "in-review" | "completed";

export type TaskPriority = "low" | "medium" | "high";

export type TaskComment = {
  name: string;
  comment: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: Date;
  categories: string[];
  createdBy: string;
  createdOn: Date;
  lastUpdated: Date;
  comments: TaskComment[];
  done: boolean;
};

export const tasks: Task[] = [
  {
    id: "1",
    title: "Design task management dashboard",
    description: "Create wireframes and mockups for the main dashboard",
    priority: "high",
    status: "in-progress",
    dueDate: new Date("2025-05-10"),
    categories: ["UI", "Design"],
    createdBy: "Rahul Sharma",
    createdOn: new Date("2025-04-21"),
    lastUpdated: new Date("2025-04-21"),
    comments: [
      { name: "John Doe", comment: "Great progress on the wireframes!" },
      { name: "Jane Smith", comment: "Can we add more color options?" },
    ],
    done: false,
  },
  {
    id: "2",
    title: "Implement task filtering",
    description: "Add functionality to filter tasks by status, priority, and date.",
    priority: "medium",
    status: "upcoming",
    dueDate: new Date("2025-02-13"),
    categories: ["Development"],
    createdBy: "Sarah Johnson",
    createdOn: new Date("2025-01-15"),
    lastUpdated: new Date("2025-01-20"),
    comments: [],
    done: false,
  },
  {
    id: "3",
    title: "Bug fixing",
    description:
      "Addressed reported bugs in the application interface to enhance stability and user experience.",
    priority: "high",
    status: "in-progress",
    dueDate: new Date("2025-03-15"),
    categories: ["Bug"],
    createdBy: "Mike Wilson",
    createdOn: new Date("2025-02-10"),
    lastUpdated: new Date("2025-02-12"),
    comments: [],
    done: false,
  },
  {
    id: "4",
    title: "Update user settings page",
    description: "Redesign and implement new user settings page",
    priority: "low",
    status: "in-review",
    dueDate: new Date("2025-05-10"),
    categories: ["Update"],
    createdBy: "Emily Davis",
    createdOn: new Date("2025-03-01"),
    lastUpdated: new Date("2025-03-05"),
    comments: [],
    done: false,
  },
  {
    id: "5",
    title: "Implement task filtering",
    description: "Add functionality to filter tasks by status, priority, and date.",
    priority: "medium",
    status: "completed",
    categories: ["Development"],
    createdBy: "Sarah Johnson",
    createdOn: new Date("2025-01-15"),
    lastUpdated: new Date("2025-02-01"),
    comments: [],
    done: true,
  },
  {
    id: "6",
    title: "Design task management dashboard",
    description: "Create wireframes and mockups for the main dashboard",
    priority: "high",
    status: "completed",
    categories: ["UI", "Design"],
    createdBy: "Rahul Sharma",
    createdOn: new Date("2025-04-21"),
    lastUpdated: new Date("2025-04-25"),
    comments: [
      { name: "John Doe", comment: "Great progress on the wireframes!" },
      { name: "Jane Smith", comment: "Can we add more color options?" },
    ],
    done: true,
  },
  {
    id: "7",
    title: "Update user settings page",
    description: "Redesign and implement new user settings page",
    priority: "low",
    status: "completed",
    categories: ["Update"],
    createdBy: "Emily Davis",
    createdOn: new Date("2025-03-01"),
    lastUpdated: new Date("2025-03-10"),
    comments: [],
    done: true,
  },
];

