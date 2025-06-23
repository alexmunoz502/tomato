import { useState, createContext, useContext } from "react";

const DEFAULT_FOCUS_GOAL_COUNT = 4;
const DEFAULT_FOCUS_DURATION = 25;
const DEFAULT_SHORT_BREAK_DURATION = 5;
const DEFAULT_LONG_BREAK_DURATION = 10;

type PomodoroSettingsContextType = {
  focusGoalCount: number;
  setFocusGoalCount: (value: number) => void;
  focusDuration: number;
  setFocusDuration: (value: number) => void;
  shortBreakDuration: number;
  setShortBreakDuration: (value: number) => void;
  longBreakDuration: number;
  setLongBreakDuration: (value: number) => void;
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
  const [focusDuration, setFocusDuration] = useState(DEFAULT_FOCUS_DURATION);
  const [shortBreakDuration, setShortBreakDuration] = useState(
    DEFAULT_SHORT_BREAK_DURATION
  );
  const [longBreakDuration, setLongBreakDuration] = useState(
    DEFAULT_LONG_BREAK_DURATION
  );

  return (
    <PomodoroSettingsContext.Provider
      value={{
        focusGoalCount,
        setFocusGoalCount,
        focusDuration,
        setFocusDuration,
        shortBreakDuration,
        setShortBreakDuration,
        longBreakDuration,
        setLongBreakDuration,
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
