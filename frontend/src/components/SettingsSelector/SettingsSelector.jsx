import "./SettingsSelector.css";

export default function SettingsSelector({
  currentSetting,
  setCurrentSetting,
}) {
  function assignBackgroundColor(buttonName) {
    if (buttonName === currentSetting) {
      return "#2196F3";
    } else {
      return null;
    }
  }

  function assignColor(buttonName) {
    if (buttonName === currentSetting) {
      return "var(--active-color)";
    } else {
      return null;
    }
  }

  return (
    <div className="settings-selector">
      <button
        style={{
          backgroundColor: assignBackgroundColor("general"),
          color: assignColor("general"),
        }}
        onClick={() => setCurrentSetting("general")}
      >
        General
      </button>

      <button
        style={{
          backgroundColor: assignBackgroundColor("pomodoro"),
          color: assignColor("pomodoro"),
        }}
        onClick={() => setCurrentSetting("pomodoro")}
      >
        Pomodoro
      </button>

      <button
        style={{
          backgroundColor: assignBackgroundColor("widgets"),
          color: assignColor("widgets"),
        }}
        onClick={() => setCurrentSetting("widgets")}
      >
        Widgets
      </button>
    </div>
  );
}
