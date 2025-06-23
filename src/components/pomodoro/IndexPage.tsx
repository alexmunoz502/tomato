import AppPage from "./AppPage";
import Timer from "@/components/pomodoro/timer";
import { usePomodoroSettings } from "@/contexts/pomodoroSettingsContext";
import SettingsButton from "@/components/pomodoro/SettingsButton";
import { usePomodoro, PomodoroState } from "@/contexts/pomodoroContext";

const IndexPage = () => {
  const settings = usePomodoroSettings();
  const pomodoro = usePomodoro();

  const handleTimeout = () => {
    pomodoro.transition();
  };

  const titleMap: Record<PomodoroState, string> = {
    focus: "Focus Time",
    shortBreak: "Short Break",
    longBreak: "Long Break",
  };

  return (
    <AppPage id="index" className="justify-center">
      <div className="flex flex-col gap-8 pb-18">
        <div className="flex flex-col items-center">
          <span className="text-sm text-base-content-100/75">
            {pomodoro.focusCompletedCount} / {settings.focusGoalCount} Completed
          </span>
          <span className="text-4xl mx-auto">{titleMap[pomodoro.state]}</span>
          <span className="text-base-content-100/75">
            Next up: {titleMap[pomodoro.nextState]}
          </span>
        </div>

        <Timer waitTime={pomodoro.duration} onTimeout={handleTimeout} />
        <SettingsButton />
      </div>
    </AppPage>
  );
};

export default IndexPage;
