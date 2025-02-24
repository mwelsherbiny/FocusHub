import { motion } from "framer-motion";
import { useState, useEffect, useRef, useContext } from "react";
import { WidgetContext } from "../../contexts";
import "./Meditation.css";
import Draggable from "react-draggable";
import PropTypes from "prop-types";

const Meditation = ({ visible, draggable }) => {
  const [phase, setPhase] = useState("Press Start");
  const [breathing, setBreathing] = useState(false);
  const [scale, setScale] = useState(1);
  const nodeRef = useRef(null);
  const intervalRef = useRef(null);
  const { positions, setPositions } = useContext(WidgetContext);

  function updatePosition(event, data) {
    const newPositions = { ...positions, meditation: { x: data.x, y: data.y } };
    setPositions(newPositions);
    localStorage.setItem("positions", JSON.stringify(newPositions));
  }

  useEffect(() => {
    if (!breathing) return;

    let cycle = 0;
    const phases = ["Inhale...", "Hold...", "Exhale..."];
    const scales = [1.2, 1.2, 1];

    setPhase(phases[cycle]);
    setScale(scales[cycle]);
    cycle++;

    intervalRef.current = setInterval(() => {
      setPhase(phases[cycle % 3]);
      setScale(scales[cycle % 3]);
      cycle++;
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, [breathing]);

  const handleToggleBreathing = () => {
    if (breathing) {
      clearInterval(intervalRef.current);
      setPhase("Press Start");
      setScale(1);
    }
    setBreathing(!breathing);
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      disabled={!draggable}
      position={positions.meditation}
      onDrag={updatePosition}
    >
      <div
        className="meditation"
        ref={nodeRef}
        style={{ display: visible ? "" : "none" }}
      >
        <motion.div
          animate={{ scale }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="breathing-circle"
        ></motion.div>
        <p className="breathing-text">{phase}</p>
        <button onClick={handleToggleBreathing} className="breathing-button">
          {breathing ? "Stop" : "Start"}
        </button>
      </div>
    </Draggable>
  );
};

export default Meditation;
Meditation.propTypes = {
  visible: PropTypes.bool.isRequired,
  draggable: PropTypes.bool.isRequired,
};