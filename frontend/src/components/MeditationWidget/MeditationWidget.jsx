import "./MeditationWidget.css";
import { WidgetContext } from "../../contexts";
import { useContext } from "react";
import PropTypes from "prop-types";

export default function MeditationWidget({ icon, visible, setVisibility }) {
  const { storedVisibility } = useContext(WidgetContext);

  return (
    <div
      className="widget meditation-widget"
      style={{ backgroundColor: visible ? "#2196F3" : null }}
      onClick={() => {
        storedVisibility.current.meditation = !visible;
        localStorage.setItem(
          "visibility",
          JSON.stringify(storedVisibility.current)
        );

        setVisibility(!visible);
      }}
    >
      <img src={icon} alt="Meditation Widget" />
    </div>
  );
}
MeditationWidget.propTypes = {
  icon: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  setVisibility: PropTypes.func.isRequired,
};
