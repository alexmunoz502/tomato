import AppPage from "./AppPage";
import { usePomodoroSettings } from "@/contexts/pomodoroSettingsContext";
import NumberInput from "../core/NumberInput";

export const SETTINGS_PAGE_ID = "settings";

const SettingsPage = () => {
  const settings = usePomodoroSettings();

  return (
    <AppPage id={SETTINGS_PAGE_ID} className="p-8 pt-24">
      <div className="flex flex-col gap-8">
        <h1 className="font-heading text-4xl">Settings</h1>
        <NumberInput
          label="Focus Sessions"
          description="The amount of focus sessions before a long break."
          value={settings.focusGoalCount}
          onChange={settings.setFocusGoalCount}
        />
        <NumberInput
          label="Focus Duration"
          description="The time to complete a focus session."
          value={settings.focusDuration}
          onChange={settings.setFocusDuration}
        />
        <NumberInput
          label="Short Break Duration"
          description="The time to take a short break"
          value={settings.shortBreakDuration}
          onChange={settings.setShortBreakDuration}
        />

        <NumberInput
          label="Long Break Duration"
          description="The time to take a long break"
          value={settings.longBreakDuration}
          onChange={settings.setLongBreakDuration}
        />
      </div>
    </AppPage>
  );
};

export default SettingsPage;
