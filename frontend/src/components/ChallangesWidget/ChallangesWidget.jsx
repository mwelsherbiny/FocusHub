import "./ChallangesWidget.css";
import { WidgetContext } from "../../contexts";
import { useContext } from "react";
import PropTypes from "prop-types";

export default function ChallangesWidget({ icon, visible, setVisibility }) {
  const { storedVisibility } = useContext(WidgetContext);

  return (
    <div
      className="widget challanges-widget"
      style={{ backgroundColor: visible ? "#2196F3" : null }}
      onClick={() => {
        storedVisibility.current.challanges = !visible;
        localStorage.setItem(
          "visibility",
          JSON.stringify(storedVisibility.current)
        );

        setVisibility(!visible);
      }}
    >
      <img src={icon} alt="Challanges Widget" />
    </div>
  );
}
ChallangesWidget.propTypes = {
  icon: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  setVisibility: PropTypes.func.isRequired,
};
