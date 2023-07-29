import React from "react";
import "./AddPlaylistVideo.css";

import { AiOutlineClose } from "../../Icons/Icons";
import {
  SET_ADD_PLAYLIST_MODAL,
  SET_PLAYLIST_MODAL,
} from "../../Reducer/Constants";
import { useData } from "../../Contexts/DataContext";
import PlaylistModal from "../Playlist Modal/PlaylistModal";

const AddPlaylistVideo = ({ videoId }) => {
  const {
    dispatch,
    state: { playlists, playlistModal },
    handleAddPlaylistVideo,
  } = useData();
  return (
    <>
      <main className="playlist-main">
        <div className="playlist-modal">
          <AiOutlineClose
            onClick={() => dispatch({ type: SET_ADD_PLAYLIST_MODAL })}
          />
          <h1>Add To Playlist</h1>
          <div className="playlist-list">
            {playlists.length > 0 ? (
              playlists?.map(({ _id, title }) => (
                <div
                  key={_id}
                  className="playlist-name"
                  onClick={() => {
                    handleAddPlaylistVideo(_id, videoId);
                    dispatch({ type: SET_ADD_PLAYLIST_MODAL });
                  }}
                >
                  <h3>{title}</h3>
                </div>
              ))
            ) : (
              <h1>No Playlist </h1>
            )}
          </div>
          <button
            className="btn"
            onClick={() => dispatch({ type: SET_PLAYLIST_MODAL })}
          >
            Create New Playlist
          </button>
        </div>
      </main>
      {playlistModal && <PlaylistModal />}
    </>
  );
};

export default AddPlaylistVideo;
