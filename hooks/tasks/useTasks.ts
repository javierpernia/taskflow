'use client';

import { Task } from "@/types";
import { initialTasks, todoReducer } from "../tasks/useTasksReducer";
import { useEffect, useReducer } from "react";

const TASK_STORAGE_KEY = 'taskflow-tasks';

export function useTasks() {
  // Recuperar el localStorage o usar estado inicial
  const getInitialTasks = (): Task[] => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(TASK_STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialTasks;
    }
    return initialTasks;
  }

  const [tasks, dispatch] = useReducer(todoReducer, getInitialTasks());

  // Guardar en localStorage cada vez que cambien las tareas
  useEffect(() => {
    console.log('Tasks changed:', tasks);
    localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  return { tasks, dispatch };
}


