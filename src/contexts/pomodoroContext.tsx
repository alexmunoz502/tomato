import { useState, createContext, useContext, useEffect } from "react";
import { usePomodoroSettings } from "./pomodoroSettingsContext";

const DEFAULT_STATE: PomodoroState = "focus";

export type PomodoroState = "focus" | "shortBreak" | "longBreak";

// type PomodoroState = {
//   title: string;
//   duration: number;
//   next: () => PomodoroStep;
//   onExit?: () => void;
// };

type PomodoroContextType = {
  state: PomodoroState;
  duration: number;
  focusCompletedCount: number;
  nextState: PomodoroState;
  transition: () => void;
  reset: () => void;
};

const PomodoroContext = createContext<PomodoroContextType | undefined>(
  undefined
);

export const PomodoroProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const settings = usePomodoroSettings();

  const [state, setState] = useState<PomodoroState>(DEFAULT_STATE);
  const [focusCompletedCount, setFocusCompletedCount] = useState<number>(0);

  useEffect(() => {
    // Reset focus tracker to avoid bugs. Currently, the state machine makes
    // assumptions based on current state which can be thrown out of whack if
    // this value changes mid-cycle.
    setFocusCompletedCount(0);
  }, [settings.focusGoalCount]);

  const getNextState = (): PomodoroState => {
    if (state == "focus") {
      return focusCompletedCount + 1 == settings.focusGoalCount
        ? "longBreak"
        : "shortBreak";
    }
    return "focus";
  };

  const transition = () => {
    if (state === "focus") setFocusCompletedCount((count) => count + 1);
    if (state === "longBreak") setFocusCompletedCount(0);
    setState(getNextState());
  };

  const reset = () => {
    setState("focus");
    setFocusCompletedCount(0);
  };

  const durationMap: Record<PomodoroState, number> = {
    focus: settings.focusDurationSeconds,
    shortBreak: settings.shortBreakDurationSeconds,
    longBreak: settings.longBreakDurationSeconds,
  };

  return (
    <PomodoroContext.Provider
      value={{
        state,
        nextState: getNextState(),
        duration: durationMap[state],
        focusCompletedCount,
        transition,
        reset,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};

export const usePomodoro = (): PomodoroContextType => {
  const context = useContext(PomodoroContext);
  if (!context) {
    throw new Error("usePomodoro must be used within a PomodoroProvider");
  }
  return context;
};

//  const states: Record<PomodoroStep, PomodoroState> = {
//     focus: {
//       title: "Focus Time",
//       duration: settings.focusDuration,
//       next: () =>
//         completedFocusSessionCount + 1 === settings.focusSessionCount
//           ? "longBreak"
//           : "shortBreak",
//       onExit: () => setCompletedFocusSessionCount((count) => count + 1),
//     },
//     shortBreak: {
//       title: "Short Break",
//       duration: settings.shortBreakDuration,
//       next: () => "focus",
//     },
//     longBreak: {
//       title: "Long Break",
//       duration: settings.longBreakDuration,
//       next: () => "focus",
//       onExit: () => setCompletedFocusSessionCount(0),
//     },
//   };
