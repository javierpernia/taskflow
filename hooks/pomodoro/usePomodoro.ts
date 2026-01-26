'use client';

import { PomodoroMode } from "@/types";
import { useEffect, useRef, useState } from "react";

const WORK_DURATION: number = 25 * 60;
const BREAK_DURATION: number = 5 * 60;

export function usePomodoro() {
  const [mode, setMode] = useState<PomodoroMode>('work');
  const [timeLeft, setTimeLeft] = useState<number>(WORK_DURATION);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isActiveSession, setIsActiveSession] = useState<boolean>(false); // para mostrar notificaciones

  // useRef para mantener la referencia al intervalo
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // funcion para actualizar el timer
  const startTimer = () => {
    setTimeLeft(prev => {
      if (prev <= 1) {
        // tiempo terminado
        setIsActiveSession(false);
        const newMode = mode === 'work' ? 'break' : 'work';
        setMode(newMode);
        return newMode === 'work' ? WORK_DURATION : BREAK_DURATION;
      }
      return prev - 1;
    })
  };

  // Iniciar o pausar
  const toggle = () => {
    if (!isRunning) {
      // iniciar
      setIsActiveSession(true);
      intervalRef.current = setInterval(startTimer, 1000);
    }

    if (isRunning && intervalRef.current) {
      // pausar
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setIsRunning(prev => !prev);
  };

  // Resetear
  const reset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    setIsActiveSession(false);
    setMode('work');
    setTimeLeft(WORK_DURATION);
  };

  // Limpiar intervalo al desmontar el componente
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, []);

  // Formatear tiempo para montar (MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    mode,
    timeLeft,
    isRunning,
    isActiveSession,
    toggle,
    reset,
    formatTime
  };
}
