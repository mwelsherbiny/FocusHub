import "./TimerWidget.css";
import { WidgetContext } from "../../contexts";
import { useContext } from "react";

export default function TimerWidget({ icon, visible, setVisibility }) {
  const { storedVisibility } = useContext(WidgetContext);

  return (
    <div
      className="widget timer-widget"
      style={{ backgroundColor: visible ? "#2196F3" : null }}
      onClick={() => {
        storedVisibility.current.timer = !visible;
        localStorage.setItem(
          "visibility",
          JSON.stringify(storedVisibility.current)
        );

        setVisibility(!visible);
      }}
    >
      <img src={icon} alt="Timer Widget" />
    </div>
  );
}
