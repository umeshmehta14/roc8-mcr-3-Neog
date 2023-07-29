import React from "react";

import "./Playlist.css";
import { useData } from "../../Contexts/DataContext";
import { AiOutlinePlusCircle, AiOutlineClose } from "../../Icons/Icons";
import { REMOVE_PLAYLIST, SET_PLAYLIST_MODAL } from "../../Reducer/Constants";
import PlaylistModal from "../../Components/Playlist Modal/PlaylistModal";
import { useNavigate } from "react-router-dom";

const Playlist = () => {
  const {
    state: { video, playlists, playlistModal },
    dispatch,
  } = useData();

  const navigate = useNavigate();

  return (
    <>
      <div className="home-box">
        <h1>Playlists</h1>
        <div className="playlist-container">
          {playlists.length > 0 ? (
            playlists?.map(({ _id, title, description, img }) => {
              return (
                <div
                  key={_id}
                  className="album-card"
                  onClick={() => navigate(`/playlist/${_id}`)}
                >
                  <AiOutlineClose
                    className="playlist-remove"
                    title="Remove"
                    onClick={() =>
                      dispatch({ type: REMOVE_PLAYLIST, payload: _id })
                    }
                  />
                  <img src={img} alt={title} />
                  <h2>{title}</h2>
                  <small>{description}</small>
                </div>
              );
            })
          ) : (
            <h1>No Playlist!! Wanna Add New Playlist</h1>
          )}
          <AiOutlinePlusCircle
            title="Add New Playlist"
            onClick={() => dispatch({ type: SET_PLAYLIST_MODAL })}
          />
        </div>
      </div>
      {playlistModal && <PlaylistModal />}
    </>
  );
};

export default Playlist;
