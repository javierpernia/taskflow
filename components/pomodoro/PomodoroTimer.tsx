// src/components/pomodoro/PomodoroTimer.tsx

'use client';

import { usePomodoro } from '@/hooks/pomodoro/usePomodoro';

export default function PomodoroTimer() {
  const { mode, timeLeft, isRunning, isActiveSession, toggle, reset } = usePomodoro();

  return (
    <div className="bg-white p-6 rounded-xl shadow text-center max-w-xs mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {mode === 'work' ? '⏱️ Trabajo' : '☕ Descanso'}
      </h2>

      {/* Notificación visual cuando termina */}
      {isActiveSession && (
        <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
          ¡En marcha!
        </div>
      )}

      <div className="text-5xl font-mono mb-6">{timeLeft}</div>

      <div className="flex justify-center gap-2">
        <button
          onClick={toggle}
          className={`px-4 py-2 rounded ${isRunning
            ? 'bg-yellow-500 hover:bg-yellow-600'
            : 'bg-green-500 hover:bg-green-600'
            } text-white`}
        >
          {isRunning ? '⏸️ Pausar' : '▶️ Iniciar'}
        </button>

        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
        >
          🔁 Reiniciar
        </button>
      </div>

      {/* Indicador visual del modo */}
      <div className="mt-4 text-sm text-gray-600">
        Próximo: {mode === 'work' ? 'Descanso' : 'Trabajo'}
      </div>
    </div>
  );
}