import "./MoodWidget.css";
import { useState } from "react";
import veryDisatisfiedIcon from "../../assets/mood-very-disatisfied.svg";
import disatisfiedIcon from "../../assets/mood-disatisfied.svg";
import neutralIcon from "../../assets/mood-neutral.svg";
import satisfiedIcon from "../../assets/mood-satisfied.svg";
import verySatisfiedIcon from "../../assets/mood-very-satisfied.svg";
import userService from "../../services/userService";
import PropTypes from "prop-types";

export default function MoodWidget({ icon, widgetProps }) {
  const [visible, setVisibility] = useState(false);

  // Moods: veryDisatisfied, disatisfied, neutral, satisfied, very satisfied
  const { mood, setMood } = widgetProps;

  function updateMood(mood) {
    setMood(mood);

    const date = new Date();
    date.setUTCHours(0, 0, 0, 0);
    userService.postUserHistory({
      date,
      mood,
    });
  }

  return (
    <div
      className="widget mood-widget"
      onMouseOver={() => {
        setVisibility(true);
      }}
      onMouseOut={() => {
        setVisibility(false);
      }}
    >
      <img src={icon} alt="Mood Widget" />
      <div
        className={`mood-menu ${visible ? "visible" : ""}`}
        style={{ visibility: visible ? "visible" : "hidden" }}
      >
        <button
          onClick={() => updateMood("veryDisatisfied")}
          style={{
            backgroundColor:
              mood === "veryDisatisfied" ? "var(--brand-color)" : null,
          }}
        >
          <img src={veryDisatisfiedIcon} alt="Very disatisfied" />
        </button>
        <button
          onClick={() => updateMood("disatisfied")}
          style={{
            backgroundColor:
              mood === "disatisfied" ? "var(--brand-color)" : null,
          }}
        >
          <img src={disatisfiedIcon} alt="Disatisfied" />
        </button>
        <button
          onClick={() => updateMood("neutral")}
          style={{
            backgroundColor: mood === "neutral" ? "var(--brand-color)" : null,
          }}
        >
          <img src={neutralIcon} alt="Neutral" />
        </button>
        <button
          onClick={() => updateMood("satisfied")}
          style={{
            backgroundColor: mood === "satisfied" ? "var(--brand-color)" : null,
          }}
        >
          <img
            src={satisfiedIcon}
            alt="Satisfied"
            style={{
              backgroundColor:
                mood === "satisfied" ? "var(--brand-color)" : null,
            }}
          />
        </button>
        <button
          onClick={() => updateMood("verySatisfied")}
          style={{
            backgroundColor:
              mood === "verySatisfied" ? "var(--brand-color)" : null,
          }}
        >
          <img src={verySatisfiedIcon} alt="Very satisfied" />
        </button>
      </div>
    </div>
  );
}
MoodWidget.propTypes = {
  icon: PropTypes.string.isRequired,
  widgetProps: PropTypes.shape({
    mood: PropTypes.string.isRequired,
    setMood: PropTypes.func.isRequired,
  }).isRequired,
};