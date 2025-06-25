"use client";
import AppContainer from "@/components/pomodoro/AppContainer";
import IndexPage from "./IndexPage";
import SettingsPage from "./SettingsPage";
import { PomodoroSettingsProvider } from "@/contexts/PomodoroSettingsContext";
import { PomodoroProvider } from "@/contexts/PomodoroContext";

const PomodoroApp = () => {
  return (
    <PomodoroSettingsProvider>
      <PomodoroProvider>
        <AppContainer>
          <IndexPage />
          <SettingsPage />
        </AppContainer>
      </PomodoroProvider>
    </PomodoroSettingsProvider>
  );
};

export default PomodoroApp;
