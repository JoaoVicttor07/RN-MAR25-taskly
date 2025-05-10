// src/types/task.ts
export interface Subtask {
    id: string;
    text: string;
    isCompleted: boolean;
  }

  export interface Task {
    title: string;
    description: string;
    deadline: string;
    id: string;
    categories: string[];
    isCompleted: boolean;
    priority?: number;
    subtasks: Subtask[];
  }