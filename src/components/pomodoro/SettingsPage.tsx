import AppPage from "./AppPage";
import { usePomodoroSettings } from "@/contexts/PomodoroSettingsContext";
import NumberInput from "../core/NumberInput";
import QuickSelect from "../core/QuickSelect";
import { minutesToSeconds } from "@/lib/fomatUtils";

export const SETTINGS_PAGE_ID = "settings";

const SettingsPage = () => {
  const settings = usePomodoroSettings();

  return (
    <AppPage id={SETTINGS_PAGE_ID} className="px-7">
      <div className="flex flex-col gap-8 overflow-y-scroll lg:overflow-y-auto p-1">
        <h1 className="font-heading text-4xl">Settings</h1>
        <NumberInput
          label="Focus Sessions"
          description="The amount of focus sessions before a long break. Changing this value will reset your focus tracker."
          value={settings.focusGoalCount}
          onChange={settings.setFocusGoalCount}
          min={1}
        />
        <div className="flex gap-4">
          <QuickSelect value={2} onSelect={settings.setFocusGoalCount} />
          <QuickSelect value={3} onSelect={settings.setFocusGoalCount} />
          <QuickSelect value={4} onSelect={settings.setFocusGoalCount} />
        </div>
        <NumberInput
          label="Focus Duration"
          description="The time to complete a focus session."
          value={settings.focusDurationMinutes}
          onChange={settings.setFocusDurationMinutes}
          min={1}
        />
        <div className="flex gap-4">
          <QuickSelect
            value={20}
            label="20 min"
            onSelect={settings.setFocusDurationMinutes}
          />
          <QuickSelect
            value={25}
            label="25 min"
            onSelect={settings.setFocusDurationMinutes}
          />
          <QuickSelect
            value={30}
            label="30 min"
            onSelect={settings.setFocusDurationMinutes}
          />
        </div>
        <NumberInput
          label="Short Break Duration"
          description="The time to take a short break"
          value={settings.shortBreakDurationMinutes}
          onChange={settings.setShortBreakDurationMinutes}
          min={1}
        />

        <div className="flex gap-4">
          <QuickSelect
            value={5}
            label="5 min"
            onSelect={settings.setShortBreakDurationMinutes}
          />
          <QuickSelect
            value={10}
            label="10 min"
            onSelect={settings.setShortBreakDurationMinutes}
          />
          <QuickSelect
            value={15}
            label="15 min"
            onSelect={settings.setShortBreakDurationMinutes}
          />
        </div>

        <NumberInput
          label="Long Break Duration"
          description="The time to take a long break"
          value={settings.longBreakDurationMinutes}
          onChange={settings.setLongBreakDurationMinutes}
          min={1}
        />

        <div className="flex gap-4">
          <QuickSelect
            value={20}
            label="20 min"
            onSelect={settings.setLongBreakDurationMinutes}
          />
          <QuickSelect
            value={25}
            label="25 min"
            onSelect={settings.setLongBreakDurationMinutes}
          />
          <QuickSelect
            value={30}
            label="30 min"
            onSelect={settings.setLongBreakDurationMinutes}
          />
        </div>
      </div>
    </AppPage>
  );
};

export default SettingsPage;
