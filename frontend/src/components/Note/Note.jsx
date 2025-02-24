import "./Note.css";
import removeNoteIcon from "../../assets/remove-note-icon.svg";
import { useState } from "react";
import Draggable from "react-draggable";
import { useRef } from "react";
import PropTypes from "prop-types";

export default function Note({ note, setNotes }) {
  const [noteText, setNoteText] = useState("");

  const nodeRef = useRef(null);

  return (
    <Draggable nodeRef={nodeRef} cancel=".note-text">
      <div className="note" ref={nodeRef}>
        {note.text}
        <div className="note-controls">
          <button
            className="remove-note-btn"
            onClick={() => {
              setNotes((notes) =>
                notes.filter((n) => {
                  return n.id !== note.id;
                })
              );
            }}
            onTouchStart={() => {
              setNotes((notes) =>
                notes.filter((n) => {
                  return n.id !== note.id;
                })
              );
            }}
          >
            <img src={removeNoteIcon} alt="remove note" />
          </button>
        </div>
        <textarea
          className="note-text"
          value={noteText}
          onChange={(event) => {
            if (!(event.target.scrollHeight > event.target.clientHeight)) {
              setNoteText(event.target.value);
            }
          }}
        ></textarea>
      </div>
    </Draggable>
  );
}

Note.propTypes = {
  note: PropTypes.object.isRequired,
  setNotes: PropTypes.object.isRequired,
};
