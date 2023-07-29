import React, { useState } from "react";
import "./PlaylistModal.css";
import { v4 as uuid } from "uuid";

import { AiOutlineClose } from "../../Icons/Icons";
import { useData } from "../../Contexts/DataContext";
import { SET_PLAYLIST_DATA, SET_PLAYLIST_MODAL } from "../../Reducer/Constants";

const PlaylistModal = () => {
  const { dispatch } = useData();

  const [playlistValue, setPlaylistValue] = useState({
    _id: uuid(),
    title: "",
    description: "",
    img: "https://picsum.photos/300/174",
    videos: [],
  });
  const handleSubmit = () => {
    dispatch({ type: SET_PLAYLIST_DATA, payload: { ...playlistValue } });
    dispatch({ type: SET_PLAYLIST_MODAL });
  };
  return (
    <main className="playlist-main">
      <form className="playlist-modal" onSubmit={handleSubmit}>
        <AiOutlineClose
          onClick={() => dispatch({ type: SET_PLAYLIST_MODAL })}
        />
        <h2>New Playlist</h2>
        <div className="playlist-input">
          <input
            type="text"
            placeholder="Title"
            maxLength={25}
            required
            onChange={({ target }) =>
              setPlaylistValue({ ...playlistValue, title: target.value })
            }
          />
        </div>
        <div className="playlist-input">
          <input
            type="text"
            placeholder="Description"
            maxLength={25}
            onChange={({ target }) =>
              setPlaylistValue({ ...playlistValue, description: target.value })
            }
            required
          />
        </div>
        <button type="submit" className="btn">
          Add New Playlist
        </button>
      </form>
    </main>
  );
};

export default PlaylistModal;
