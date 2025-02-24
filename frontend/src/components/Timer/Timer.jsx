import "./Timer.css";
import { useState, useRef, useContext, useEffect } from "react";
import { NotificationContext } from "../../contexts";
import alarmSound from "../../assets/timer-alarm.mp3";
import { UserContext, WidgetContext } from "../../contexts";
import userService from "../../services/userService";
import Draggable from "react-draggable";
import PropTypes from "prop-types";

export default function Timer({ visible, pomodoroSettings, draggable }) {
  // currentSessionTime is in minutes
  const { sessionTime, breakTime } = pomodoroSettings;
  const [currentSessionTime, setCurrentSessionTime] = useState(sessionTime);
  const [currentBreakTime, setCurrentBreakTime] = useState(breakTime);
  const [seconds, setSeconds] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const interval = useRef(null);
  const { setVisibleNotification, setNotification } =
    useContext(NotificationContext);
  const { user } = useContext(UserContext);
  const { positions, setPositions } = useContext(WidgetContext);
  const nodeRef = useRef(null);

  useEffect(() => {
    setCurrentSessionTime(sessionTime);
    setCurrentBreakTime(breakTime);
    setSeconds(0);
    setIsOn(false);
  }, [sessionTime, breakTime]);

  function updatePosition(event, data) {
    const newPositions = { ...positions, timer: { x: data.x, y: data.y } };
    setPositions(newPositions);
    localStorage.setItem("positions", JSON.stringify(newPositions));
  }

  async function resetTimer() {
    clearInterval(interval.current);

    setIsOn(false);

    if (isSession) {
      setCurrentSessionTime(sessionTime);
      userService.updateUser({ pomodoros: user.pomodoros + 1 });
    } else {
      setCurrentBreakTime(breakTime);
    }

    const audio = new Audio(alarmSound);
    audio.play();

    setNotification({
      content: isSession ? "Session completed!" : "Break over!",
      type: "default",
    });
    setVisibleNotification(true);

    setTimeout(() => {
      setVisibleNotification(false);
    }, 5000);

    return;
  }

  function getUpdatedTime(minutes, seconds) {
    if (seconds === 0) {
      if (minutes === 0) {
        resetTimer();
      } else {
        if (isSession) {
          setCurrentSessionTime((prevTime) => prevTime - 1);
        } else {
          setCurrentBreakTime((prevTime) => prevTime - 1);
        }
        setSeconds(59);
      }
    } else {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }
  }

  useEffect(() => {
    if (isOn) {
      interval.current = setInterval(() => {
        if (isSession) {
          getUpdatedTime(currentSessionTime, seconds);
        } else {
          getUpdatedTime(currentBreakTime, seconds);
        }
      }, 1000);

      return () => {
        clearInterval(interval.current);
      };
    } else {
      clearInterval(interval.current);
      interval.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOn, currentSessionTime, seconds]);

  function getTimeString(time) {
    let timeString = "";
    if (time.min < 10) {
      timeString += "0";
    }
    timeString += time.min + ":";
    if (time.sec < 10) {
      timeString += "0";
    }
    timeString += time.sec;

    return timeString;
  }

  return (
    <Draggable
      position={positions.timer}
      onDrag={updatePosition}
      nodeRef={nodeRef}
      disabled={!draggable}
    >
      <div
        ref={nodeRef}
        className="timer"
        style={{ display: visible ? "" : "none" }}
      >
        <div className="settings-selector">
          <button
            onClick={() => {
              setCurrentSessionTime(sessionTime);
              setSeconds(0);
              setIsSession(true);
              setIsOn(false);
            }}
            style={{
              backgroundColor: isSession ? "#2196F3" : null,
              color: isSession ? "var(--active-color)" : null,
            }}
          >
            Session
          </button>
          <button
            onClick={() => {
              setCurrentBreakTime(breakTime);
              setSeconds(0);
              setIsSession(false);
              setIsOn(false);
            }}
            style={{
              backgroundColor: isSession ? null : "#2196F3",
              color: isSession ? null : "var(--active-color)",
            }}
          >
            Break
          </button>
        </div>
        <p className="time">
          {getTimeString({
            min: isSession ? currentSessionTime : currentBreakTime,
            sec: seconds,
          })}
        </p>
        <button
          className="timer-btn"
          onClick={() => setIsOn(!isOn)}
          style={{ backgroundColor: isOn ? "#F23426" : null }}
        >
          {isOn ? "Stop" : "Start"}
        </button>
      </div>
    </Draggable>
  );
}

Timer.propTypes = {
  visible: PropTypes.bool.isRequired,
  pomodoroSettings: PropTypes.shape({
    sessionTime: PropTypes.number.isRequired,
    breakTime: PropTypes.number.isRequired,
  }).isRequired,
  draggable: PropTypes.bool.isRequired,
};
