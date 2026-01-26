'use client';

import KanbanColumn from "./KanbanColumn";

export default function KanbanBoard() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      <KanbanColumn status="pending" title="📌 Pendientes" color="bg-gray-100" />
      <KanbanColumn status="inProgress" title="🚧 En Progreso" color="bg-yellow-100" />
      <KanbanColumn status="completed" title="✅ Completados" color="bg-green-100" />
    </div>
  );
}