'use client';

import { useTasks } from "@/context/TaskContext";
import { Task } from "@/types";


type TaskCardsProps = {
  task: Task;
}

export default function TaskCards({ task }: TaskCardsProps) {
  const { dispatch } = useTasks();

  const handleDelete = () => {
    dispatch({ type: 'DELETE_TASK', payload: task.id });
  }
  return (
    <div className="p-4 border rounded-lg">
      <p className="font-bold text-sm">{task.title}</p>
      <button onClick={handleDelete} className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
    </div>
  );
}