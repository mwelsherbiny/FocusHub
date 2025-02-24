import "./PomodoroSettings.css";
import PropTypes from "prop-types";

export default function PomodoroSettings({ pomodoroSettings }) {
  const { breakTime, setBreakTime, sessionTime, setSessionTime } =
    pomodoroSettings;

  const sessionTimeRange = [15, 120];
  const breakTimeRange = [5, 120];

  function withinRange([min, max], value) {
    if (value >= min && value <= max) {
      return true;
    }

    return false;
  }

  return (
    <div className="pomodoro-settings">
      <div className="pomodoro-settings-option">
        <label htmlFor="session-time">Session Time</label>
        <input
          value={sessionTime}
          type="text"
          id="session-time"
          onChange={(event) => {
            const newSessionTime = event.target.value;
            if (!isNaN(newSessionTime) && newSessionTime.length <= 3) {
              setSessionTime(event.target.value);
            }
          }}
          onBlur={(event) => {
            const number = event.target.value;
            if (isNaN(number)) {
              setSessionTime(breakTimeRange[0]);
              return;
            }
            if (withinRange(sessionTimeRange, +number)) {
              setSessionTime(number);
            } else {
              if (number < sessionTimeRange[0]) {
                setSessionTime(sessionTimeRange[0]);
              } else {
                setSessionTime(sessionTimeRange[1]);
              }
            }
          }}
        />
      </div>

      <div className="pomodoro-settings-option">
        <label htmlFor="break-time">Break Time</label>
        <input
          value={breakTime}
          type="text"
          id="break-time"
          onChange={(event) => {
            const newBreakTime = event.target.value;
            if (!isNaN(newBreakTime) && newBreakTime.length <= 3) {
              setBreakTime(event.target.value);
            }
          }}
          onBlur={(event) => {
            const number = event.target.value;
            if (isNaN(number)) {
              setBreakTime(breakTimeRange[0]);
              return;
            }
            if (withinRange(breakTimeRange, +number)) {
              setBreakTime(number);
            } else {
              if (number < breakTimeRange[0]) {
                setBreakTime(breakTimeRange[0]);
              } else {
                setBreakTime(breakTimeRange[1]);
              }
            }
          }}
        />
      </div>
    </div>
  );
}
PomodoroSettings.propTypes = {
  pomodoroSettings: PropTypes.shape({
    breakTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    setBreakTime: PropTypes.func.isRequired,
    sessionTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    setSessionTime: PropTypes.func.isRequired,
  }).isRequired,
};
