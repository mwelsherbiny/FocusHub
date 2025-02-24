import "./GeneralSettings.css";
import Switch from "@mui/material/Switch";
import { useContext } from "react";
import { WidgetContext } from "../../contexts";

export default function GeneralSettings({ generalSettings }) {
  const { positions, setPositions } = useContext(WidgetContext);

  function resetPositions() {
    const defaultPositions = { ...positions };
    Object.keys(positions).forEach((k) => {
      defaultPositions[k] = { x: 0, y: 0 };
    });

    setPositions(defaultPositions);
    localStorage.setItem("positions", JSON.stringify(defaultPositions));
  }

  return (
    <div className="general-settings">
      <div className="settings-switches">
        <div>
          <span>Light Mode</span>
          <Switch
            inputProps={{ "aria-label": "Theme switch" }}
            onChange={generalSettings.toggleLightMode}
            checked={generalSettings.lightMode}
          />
        </div>
        <div>
          <span>Fullscreen </span>
          <span> </span>
          <Switch
            inputProps={{ "aria-label": "Screen mode switch" }}
            onChange={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
              } else if (document.exitFullscreen) {
                document.exitFullscreen();
              }
            }}
          />
        </div>
      </div>

      <div className="settings-btns">
        <button className="reset-btn" onClick={resetPositions}>
          Reset Positions
        </button>
        <button
          className="auth-btn"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("signedIn");
            generalSettings.setSignedIn(false);
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
