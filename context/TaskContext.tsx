'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useTasks as useTasksHook } from '@/hooks/tasks/useTasks';
import type { Task } from '@/types';

interface TasksContextType {
  tasks: Task[];
  dispatch: React.Dispatch<any>;
}

const TasksContext = createContext<TasksContextType>({
  tasks: [],
  dispatch: () => { },
});

export function TasksProvider({ children }: { children: ReactNode }) {
  const { tasks, dispatch } = useTasksHook(); // ← usa tu hook existente

  return (
    <TasksContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
}

export const useTasks = () => useContext(TasksContext);