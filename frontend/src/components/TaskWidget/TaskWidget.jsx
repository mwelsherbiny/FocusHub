import "./TaskWidget.css";
import { WidgetContext } from "../../contexts";
import { useContext } from "react";

export default function TaskWidget({ icon, visible, setVisibility }) {
  const { storedVisibility } = useContext(WidgetContext);

  return (
    <div
      className="widget task-widget"
      style={{ backgroundColor: visible ? "#2196F3" : null }}
      onClick={() => {
        storedVisibility.current.tasks = !visible;
        localStorage.setItem(
          "visibility",
          JSON.stringify(storedVisibility.current)
        );

        setVisibility(!visible);
      }}
    >
      <img src={icon} alt="Task Widget" />
    </div>
  );
}
