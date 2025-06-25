import { useState, createContext, useContext } from "react";

const SECONDS_PER_MINUTE = 60;
const DEFAULT_FOCUS_GOAL_COUNT = 4;
const DEFAULT_FOCUS_DURATION_SECONDS = 25 * SECONDS_PER_MINUTE;
const DEFAULT_SHORT_BREAK_DURATION_SECONDS = 5 * SECONDS_PER_MINUTE;
const DEFAULT_LONG_BREAK_DURATION_SECONDS = 10 * SECONDS_PER_MINUTE;

type PomodoroSettingsContextType = {
  focusGoalCount: number;
  setFocusGoalCount: (value: number) => void;

  focusDurationSeconds: number;
  shortBreakDurationSeconds: number;
  longBreakDurationSeconds: number;

  focusDurationMinutes: number;
  setFocusDurationMinutes: (value: number) => void;
  shortBreakDurationMinutes: number;
  setShortBreakDurationMinutes: (value: number) => void;
  longBreakDurationMinutes: number;
  setLongBreakDurationMinutes: (value: number) => void;
};

const PomodoroSettingsContext = createContext<
  PomodoroSettingsContextType | undefined
>(undefined);

type PomodoroSettingsProviderProps = {
  children: React.ReactNode;
};

export const PomodoroSettingsProvider = ({
  children,
}: PomodoroSettingsProviderProps) => {
  const [focusGoalCount, setFocusGoalCount] = useState<number>(
    DEFAULT_FOCUS_GOAL_COUNT
  );
  const [focusDurationSeconds, setFocusDurationSeconds] = useState(
    DEFAULT_FOCUS_DURATION_SECONDS
  );
  const [shortBreakDurationSeconds, setShortBreakDurationSeconds] = useState(
    DEFAULT_SHORT_BREAK_DURATION_SECONDS
  );
  const [longBreakDurationSeconds, setLongBreakDurationSeconds] = useState(
    DEFAULT_LONG_BREAK_DURATION_SECONDS
  );

  return (
    <PomodoroSettingsContext.Provider
      value={{
        focusGoalCount,
        setFocusGoalCount,
        focusDurationSeconds,
        shortBreakDurationSeconds,
        longBreakDurationSeconds,
        focusDurationMinutes: Math.floor(
          focusDurationSeconds / SECONDS_PER_MINUTE
        ),
        setFocusDurationMinutes: (minutes) =>
          setFocusDurationSeconds(minutes * SECONDS_PER_MINUTE),
        shortBreakDurationMinutes: Math.floor(
          shortBreakDurationSeconds / SECONDS_PER_MINUTE
        ),
        setShortBreakDurationMinutes: (minutes) =>
          setShortBreakDurationSeconds(minutes * SECONDS_PER_MINUTE),
        longBreakDurationMinutes: Math.floor(longBreakDurationSeconds / 60),
        setLongBreakDurationMinutes: (minutes) =>
          setLongBreakDurationSeconds(minutes * SECONDS_PER_MINUTE),
      }}
    >
      {children}
    </PomodoroSettingsContext.Provider>
  );
};

export const usePomodoroSettings = (): PomodoroSettingsContextType => {
  const context = useContext(PomodoroSettingsContext);
  if (!context) {
    throw new Error(
      "usePomodoroSettings must be used within a PomodoroSettingsProvider"
    );
  }
  return context;
};
