import "./NoteWidget.css";

export default function NoteWidget({
  icon,
  visible,
  setVisibility,
  widgetProps,
}) {
  const { notes, setNotes } = widgetProps;
  const notesCount = notes.length;
  const maxCount = 10;
  return (
    <div
      className="widget note-widget"
      style={{ backgroundColor: notesCount > 0 ? "#2196F3" : null }}
      onClick={() => {
        if (notesCount === 1) {
          setVisibility(true);
        }
        if (notesCount >= maxCount) {
          return;
        }
        setNotes([...notes, { text: "", id: Date.now() }]);
      }}
    >
      <div
        className="notes-count"
        style={{ visibility: notesCount > 0 ? "visible" : "hidden" }}
      >
        {notesCount}
      </div>
      <img src={icon} alt="Note Widget" />
    </div>
  );
}
