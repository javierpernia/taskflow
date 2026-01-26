'use client';

import { Task, TaskStatus } from "@/types";
import TaskCards from "./TaskCards";
import { useTasks } from "@/context/TaskContext";

type KanbanColumnProps = {
  status: TaskStatus;
  title: string;
  color: string;
}

export default function KanbanColumn({ status, title, color }: KanbanColumnProps) {
  const { tasks, dispatch } = useTasks();

  const filteredTasks = tasks.filter(task => task.status === status);

  const handleMoveTask = (taskId: string) => {
    let nextStatus: TaskStatus = 'completed';
    if (status === 'pending') nextStatus = 'inProgress';
    if (status === 'inProgress') nextStatus = 'completed';

    // si está 'completed' no hace nada
    if (nextStatus !== status) {
      dispatch({
        type: 'MOVE_TASK',
        payload: { id: taskId, to: nextStatus }
      });
    }
  };

  return (
    <div className={`flex-1 flex-col p-4 rounded-lg ${color}`}>
      <h2 className="text-lg font-bold mb-3">{title}</h2>
      <div className="space-y-2">

        {filteredTasks.map(task => (
          <div key={task.id} className="relative">
            <TaskCards key={task.id} task={task} />
            {status !== 'completed' && (
              <button
                onClick={() => handleMoveTask(task.id)}
                className="absolute top-0 right-0">
                →
              </button>
            )}
          </div>
        ))}

      </div>
    </div>
  );
}