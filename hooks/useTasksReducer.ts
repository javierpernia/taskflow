import type { Task, TaskAction } from "@/types";

function todoReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, { id: Date.now(), title: action.payload, status: 'pending' }];
    case 'MOVE_TASK':
      return state.map(task =>
        task.id === action.payload ? { ...task, status: action.payload } : task
      );

    default:
      return state;
  }
}