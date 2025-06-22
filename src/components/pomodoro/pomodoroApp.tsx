"use client";
import Timer from "@/components/pomodoro/timer";
import { useState, useEffect } from "react";
import { minutesToSeconds } from "@/lib/fomatUtils";

type PomodoroStep = "focus" | "shortBreak" | "longBreak";

type PomodoroState = {
  title: string;
  duration: number;
  next: () => PomodoroStep;
  onExit?: () => void;
};

const PomodoroApp = () => {
  const [autoEnabled, setAutoEnabled] = useState<boolean>(false);
  const [focusSessionCount, setFocusSessionCount] = useState<number>(4);
  const [completedFocusSessionCount, setCompletedFocusSessionCount] =
    useState<number>(0);
  const [focusDuration, setFocusDuration] = useState<number>(
    minutesToSeconds(25)
  );
  const [shortBreakDuration, setShortBreakDuration] = useState<number>(
    minutesToSeconds(5)
  );
  const [longBreakDuration, setLongBreakDuration] = useState<number>(
    minutesToSeconds(20)
  );

  const states: Record<PomodoroStep, PomodoroState> = {
    focus: {
      title: "Focus Time",
      duration: focusDuration,
      next: () =>
        completedFocusSessionCount + 1 === focusSessionCount
          ? "longBreak"
          : "shortBreak",
      onExit: () => setCompletedFocusSessionCount((count) => count + 1),
    },
    shortBreak: {
      title: "Short Break",
      duration: shortBreakDuration,
      next: () => "focus",
    },
    longBreak: {
      title: "Long Break",
      duration: longBreakDuration,
      next: () => "focus",
      onExit: () => setCompletedFocusSessionCount(0),
    },
  };

  const [state, setState] = useState<PomodoroState>(states.focus);

  const handleTimeout = () => {
    state.onExit && state.onExit();
    setState(states[state.next()]);
  };

  const getWaitTime = (pomodoroStep: PomodoroStep): number => {
    switch (pomodoroStep) {
      case "focus":
        return focusDuration;
      case "shortBreak":
        return shortBreakDuration;
      case "longBreak":
        return longBreakDuration;
      default:
        return 0;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center">
        <span className="text-sm text-base-content-100/75">
          {completedFocusSessionCount} / {focusSessionCount} Completed
        </span>
        <span className="text-4xl mx-auto">{state.title}</span>
        <span className="text-base-content-100/75">
          Next up: {states[state.next()].title}
        </span>
      </div>

      <Timer
        waitTime={state.duration}
        onTimeout={handleTimeout}
        autoStart={autoEnabled}
      />
    </div>
  );
};

export default PomodoroApp;
