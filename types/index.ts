interface User {
  id: number;
  name: string;
};

// TaskStatus: define los estados posibles de una tarea
type TaskStatus = 'pending' | 'inProgress' | 'completed';

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}

type TaskAction =
  | { type: 'ADD_TASK'; payload: string }
  | { type: 'MOVE_TASK'; payload: { id: string; to: TaskStatus } }
  | { type: 'DELETE_TASK'; payload: string };

export type { User, Task, TaskAction, TaskStatus };
