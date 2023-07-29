import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useData } from "../../Contexts/DataContext";

import {
  AiOutlineClockCircle,
  MdPlaylistAdd,
  MdEditNote,
  AiFillClockCircle,
  FiEdit2,
  AiFillDelete,
} from "../../Icons/Icons";

import "./SingleVideo.css";
import {
  SET_ADD_PLAYLIST_MODAL,
  SET_NOTE_MODAL,
} from "../../Reducer/Constants";
import AddPlaylistVideo from "../../Components/AddPlaylistVideo/AddPlaylistVideo";
import NoteModal from "../../Components/Note Modal/NoteModal";

const SingleVideo = () => {
  const { videoId } = useParams();

  const navigate = useNavigate();

  const {
    state: { video, category, addPlaylistModal, noteModal },
    handleWatchLater,
    handleNote,
    dispatch,
  } = useData();

  const [editNote, setEditNote] = useState({});

  const selectedVideo = video?.find(({ _id }) => _id === +videoId);

  const selectedCategory = category?.find(
    ({ category }) => category === selectedVideo?.category
  );

  const moreVideo = video?.filter(({ _id }) => _id !== +videoId);

  const { _id, title, src, watchLater } = selectedVideo;

  return (
    <>
      <main className="single-video-main-box">
        <div className="vdo-section">
          <section className="vdo-frame">
            <iframe
              width="760"
              height="515"
              src={src}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </section>
          <section className="vdo-icons">
            <section className="vdo-channel-name">
              <div className="vdo-avatar">
                <img
                  src={selectedCategory?.thumbnail}
                  alt={selectedCategory?.category}
                />
              </div>
              <strong>{title}</strong>
            </section>
            <section className="icon-section">
              {watchLater ? (
                <AiFillClockCircle
                  onClick={() => handleWatchLater(_id)}
                  title="Remove from watch later"
                />
              ) : (
                <AiOutlineClockCircle
                  onClick={() => handleWatchLater(_id)}
                  title="Save to watch later"
                />
              )}
              <MdPlaylistAdd
                title="Add To Playlist"
                onClick={() => dispatch({ type: SET_ADD_PLAYLIST_MODAL })}
              />
              <MdEditNote
                title="Add Note"
                onClick={() => dispatch({ type: SET_NOTE_MODAL })}
              />
            </section>
          </section>
          <section className="notes-section">
            <h2>My Notes</h2>
            <div className="notes-box">
              {selectedVideo?.note?.map((not) => {
                const { _id, note } = not;
                return (
                  <div key={_id} className="note-card">
                    <div className="note-text">{note}</div>
                    <div className="note-icon">
                      <FiEdit2
                        title="Edit"
                        onClick={() => {
                          setEditNote(not);
                          dispatch({ type: SET_NOTE_MODAL });
                        }}
                      />
                      <AiFillDelete
                        title="Delete"
                        onClick={() =>
                          handleNote(selectedVideo._id, "", not._id)
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <section className="more-vdos">
          <h3>More Videos:</h3>
          <div className="more-vdo-box">
            {moreVideo?.map((vdo) => {
              const { title, _id, category, thumbnail } = vdo;
              return (
                <div
                  key={_id}
                  className="more-card"
                  onClick={() => navigate(`/video/${_id}`)}
                >
                  <img src={thumbnail} alt={title} />
                  <section className="more-vdo-detail">
                    <strong>{title}</strong>
                    <small>{category}</small>
                  </section>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      {addPlaylistModal && <AddPlaylistVideo videoId={_id} />}
      {noteModal && (
        <NoteModal
          videoId={_id}
          editNote={editNote}
          edit={editNote?.note?.length > 0 && true}
        />
      )}
    </>
  );
};

export default SingleVideo;
