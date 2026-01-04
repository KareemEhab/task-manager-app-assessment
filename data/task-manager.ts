import { Task, tasks as initialTasks } from "./tasks";

// Create a mutable copy of tasks
let tasks: Task[] = [...initialTasks];

export function getAllTasks(): Task[] {
  return [...tasks];
}

export function addTask(task: Task): void {
  tasks.push(task);
}

export function updateTask(taskId: string, updates: Partial<Task>): void {
  const index = tasks.findIndex((t) => t.id === taskId);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updates };
  }
}

export function deleteTask(taskId: string): void {
  tasks = tasks.filter((t) => t.id !== taskId);
}

export function getTaskById(taskId: string): Task | undefined {
  return tasks.find((t) => t.id === taskId);
}


