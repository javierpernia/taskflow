import type { Task, TaskAction } from "@/types";

const initialTasks: Task[] = [];

function todoReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, { id: Date.now().toString(), title: action.payload, status: 'pending' }];

    case 'MOVE_TASK':
      const { id, to } = action.payload;
      return state.map(task =>
        task.id === id
          ? { ...task, status: to }
          : task
      );

    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.payload);

    default:
      return state;
  }
}

export { todoReducer, initialTasks };