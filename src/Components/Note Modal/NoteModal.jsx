import React, { useState } from "react";
import "./NoteModal.css";
import { SET_NOTE_MODAL } from "../../Reducer/Constants";
import { AiOutlineClose } from "../../Icons/Icons";
import { useData } from "../../Contexts/DataContext";
import { v4 as uuid } from "uuid";

const NoteModal = ({ videoId }) => {
  const { dispatch, handleNote } = useData();

  const [noteValue, setNoteValue] = useState({
    _id: uuid(),
    note: "",
  });

  const handleSubmit = () => {
    handleNote(videoId, noteValue);
    dispatch({ type: SET_NOTE_MODAL });
  };
  return (
    <main className="playlist-main">
      <form className="playlist-modal" onSubmit={handleSubmit}>
        <AiOutlineClose onClick={() => dispatch({ type: SET_NOTE_MODAL })} />
        <h1>Add Note</h1>
        <div className="playlist-input">
          <input
            type="text"
            placeholder="Add New Note"
            maxLength={25}
            required
            onChange={({ target }) =>
              setNoteValue({ ...noteValue, note: target.value })
            }
          />
        </div>
        <button type="submit" className="btn">
          Add Note
        </button>
      </form>
    </main>
  );
};

export default NoteModal;
