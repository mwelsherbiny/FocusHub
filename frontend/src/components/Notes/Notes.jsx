import "./Notes.css";
import { useState } from "react";
import Note from "../Note/Note";

export default function Notes({ notes, setNotes }) {
  return (
    <>
      {notes.map((note) => {
        return <Note key={note.id} note={note} setNotes={setNotes} />;
      })}
    </>
  );
}
