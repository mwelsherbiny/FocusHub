import "./SettingsPanel.css";
import { useState, useContext } from "react";
import PomodoroSettings from "../PomodoroSettings/PomodoroSettings";
import WidgetSettings from "../WidgetSettings/WidgetSettings";
import SettingsSelector from "../SettingsSelector/SettingsSelector";
import GeneralSettings from "../GeneralSettings/GeneralSettings";

export default function SettingsPanel({ generalSettings, pomodoroSettings }) {
  const [currentSetting, setCurrentSetting] = useState("general");

  return (
    <div className="settings-panel">
      <h2>Settings</h2>
      <SettingsSelector
        currentSetting={currentSetting}
        setCurrentSetting={setCurrentSetting}
      />
      {currentSetting === "general" && (
        <GeneralSettings generalSettings={generalSettings} />
      )}
      {currentSetting === "pomodoro" && (
        <PomodoroSettings pomodoroSettings={pomodoroSettings} />
      )}
      {currentSetting === "widgets" && <WidgetSettings />}
    </div>
  );
}
