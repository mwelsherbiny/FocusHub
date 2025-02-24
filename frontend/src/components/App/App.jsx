import "./App.css";
import { useEffect, useState, useRef } from "react";
import Widgets from "../Widgets/Widgets";
import Settings from "../Settings/Settings";
import MoodWidget from "../MoodWidget/MoodWidget";
import TaskWidget from "../TaskWidget/TaskWidget";
import TimerWidget from "../TimerWidget/TimerWidget";
import NoteWidget from "../NoteWidget/NoteWidget";
import MeditationWidget from "../MeditationWidget/MeditationWidget";
import taskWidgetIcon from "../../assets/task-widget-icon.svg";
import timerWidgetIcon from "../../assets/timer-widget-icon.svg";
import noteWidgetIcon from "../../assets/note-widget-icon.svg";
import moodWidgetIcon from "../../assets/mood-widget-icon.svg";
import challangesWidgetIcon from "../../assets/challanges-widget-icon.svg";
import MeditationWidgetIcon from "../../assets/meditation-widget-icon.svg";
import { WidgetContext } from "../../contexts";
import Notification from "../Notification/Notification";
import { NotificationContext } from "../../contexts";
import { UserContext } from "../../contexts";
import Tasks from "../Tasks/Tasks";
import Timer from "../Timer/Timer";
import Notes from "../Notes/Notes";
import Auth from "../Auth/Auth";
import Meditation from "../Meditation/Meditation";
import Challanges from "../Challanges/Challanges";
import userService from "../../services/userService";
import ChallangesWidget from "../ChallangesWidget/ChallangesWidget";

function App() {
  const [user, setUser] = useState(null);
  const [singedIn, setSignedIn] = useState(localStorage.getItem("signedIn"));
  useEffect(() => {
    if (singedIn) {
      async function getUserData() {
        const user = await userService.getUser();
        setUser(user);
        setLightMode(user.settings.lightMode);
        setSessionTime(user.settings.sessionTime);
        setBreakTime(user.settings.breakTime);
      }
      getUserData();
    }
  }, [singedIn]);

  const [lightMode, setLightMode] = useState(false);

  let storedVisibility = useRef(null);
  if (!localStorage.getItem("visibility")) {
    storedVisibility.current = {
      tasks: true,
      timer: true,
      meditation: true,
      challanges: true,
    };
    localStorage.setItem(
      "visibility",
      JSON.stringify(storedVisibility.current)
    );
  } else {
    storedVisibility.current = JSON.parse(localStorage.getItem("visibility"));
  }

  const [taskVisibility, setTaskVisibility] = useState(
    storedVisibility.current.tasks
  );
  const [timerVisibility, setTimerVisibility] = useState(
    storedVisibility.current.timer
  );
  const [noteVisibility, setNoteVisibility] = useState(true);
  const [meditationVisibility, setMeditationVisibility] = useState(
    storedVisibility.current.meditation
  );
  const [challangesVisibility, setChallangesVisibility] = useState(
    storedVisibility.current.challanges
  );

  const smallScreenSize = 700;
  const [draggable, setDraggable] = useState(
    !(window.innerWidth < smallScreenSize)
  );
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= smallScreenSize && draggable) {
        setDraggable(false);
        resetPositions();
      } else if (window.innerWidth > smallScreenSize && !draggable) {
        setDraggable(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [draggable, resetPositions]);

  const [sessionTime, setSessionTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [notes, setNotes] = useState([]);
  const [notification, setNotification] = useState({ content: "", type: "" }); // types: default, warning, error, success
  const [visibleNotification, setVisibleNotification] = useState(false);

  const [mood, setMood] = useState(null);

  useEffect(() => {
    if (singedIn) {
      async function fetchMood() {
        const date = new Date();
        date.setUTCHours(0, 0, 0, 0);
        const history = await userService.getUserHistoryAt(date);
        if (history) {
          setMood(history.mood);
        }
      }
      fetchMood();
    }
  }, [singedIn]);

  let storedPositions = localStorage.getItem("positions");
  if (!storedPositions) {
    storedPositions = {
      tasks: { x: 0, y: 0 },
      timer: { x: 0, y: 0 },
      meditation: { x: 0, y: 0 },
      challanges: { x: 0, y: 0 },
    };
    localStorage.setItem("positions", JSON.stringify(storedPositions));
  }

  const [positions, setPositions] = useState(
    JSON.parse(localStorage.getItem("positions"))
  );
  function resetPositions() {
    const defaultPositions = { ...positions };
    Object.keys(positions).forEach((k) => {
      defaultPositions[k] = { x: 0, y: 0 };
    });

    setPositions(defaultPositions);
  }

  const generalSettings = {
    lightMode,
    toggleLightMode,
    setSignedIn,
  };

  const pomodoroSettings = {
    sessionTime,
    setSessionTime,
    breakTime,
    setBreakTime,
  };

  async function toggleLightMode() {
    setLightMode(!lightMode);

    if (singedIn) {
      const updatedUser = await userService.updateUser({
        settings: { ...user.settings, lightMode: !lightMode },
      });
      setUser(updatedUser);
    }
  }

  const widgets = [
    {
      widget: TaskWidget,
      name: "taskWidget",
      icon: taskWidgetIcon,
      visible: taskVisibility,
      setVisibility: setTaskVisibility,
    },
    {
      widget: MoodWidget,
      name: "moodWidget",
      icon: moodWidgetIcon,
      widgetProps: { mood, setMood },
    },
    {
      widget: TimerWidget,
      name: "timerWidget",
      icon: timerWidgetIcon,
      visible: timerVisibility,
      setVisibility: setTimerVisibility,
    },
    {
      widget: NoteWidget,
      name: "noteWidget",
      icon: noteWidgetIcon,
      visible: noteVisibility,
      setVisibility: setNoteVisibility,
      widgetProps: { notes, setNotes },
    },
    {
      widget: MeditationWidget,
      name: "meditationWidget",
      icon: MeditationWidgetIcon,
      visible: meditationVisibility,
      setVisibility: setMeditationVisibility,
    },
    {
      widget: ChallangesWidget,
      name: "challangesWidget",
      icon: challangesWidgetIcon,
      visible: challangesVisibility,
      setVisibility: setChallangesVisibility,
    },
  ];

  let storedFilter = localStorage.getItem("widgetFilter");
  if (!storedFilter) {
    storedFilter = widgets.reduce((acc, widget) => {
      acc[widget.name] = true;
      return acc;
    }, {});
    localStorage.setItem("widgetFilter", JSON.stringify(storedFilter));
  }

  const [widgetFilter, setWidgetFilter] = useState(
    JSON.parse(localStorage.getItem("widgetFilter"))
  );

  if (lightMode) {
    document.body.classList.add("light");
  } else {
    document.body.classList.remove("light");
  }

  if (!singedIn) {
    return (
      <NotificationContext.Provider
        value={{ setNotification, setVisibleNotification }}
      >
        <Auth setSignedIn={setSignedIn} />
        <Notification
          notification={notification}
          visible={visibleNotification}
        />
      </NotificationContext.Provider>
    );
  }

  if (singedIn && !user) {
    return null;
  }

  return (
    <div className="app">
      <UserContext.Provider value={{ user, setUser }}>
        <NotificationContext.Provider
          value={{ setNotification, setVisibleNotification }}
        >
          <WidgetContext.Provider
            value={{
              widgets,
              widgetFilter,
              setWidgetFilter,
              positions,
              setPositions,
              storedVisibility,
            }}
          >
            <Widgets smallScreen={!draggable} />
            <Settings
              generalSettings={generalSettings}
              pomodoroSettings={pomodoroSettings}
            />
            <Tasks visible={taskVisibility} draggable={draggable} />
            <Timer
              visible={timerVisibility}
              draggable={draggable}
              pomodoroSettings={pomodoroSettings}
            />
            <Notes visible={noteVisibility} notes={notes} setNotes={setNotes} />
            <Meditation visible={meditationVisibility} draggable={draggable} />
            <Challanges visible={challangesVisibility} draggable={draggable} />
          </WidgetContext.Provider>
          <Notification
            notification={notification}
            visible={visibleNotification}
          />
        </NotificationContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
