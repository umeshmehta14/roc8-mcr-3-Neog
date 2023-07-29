import { createContext, useContext, useEffect, useReducer } from "react";
import { VideoReducer } from "../Reducer/VideoReducer";
import { videos } from "../Data/VideoData";
import { categories } from "../Data/CategoryData";
import { UPDATE_PLAYLIST, UPDATE_VIDEO } from "../Reducer/Constants";
import { toast } from "react-hot-toast";

export const DataContext = createContext();

const initialState = {
  video: (() => JSON.parse(localStorage.getItem("um-video-data")) || videos)(),
  playlists: (() =>
    JSON.parse(localStorage.getItem("um-playlist-data")) || [])(),
  category: categories,
  searchKey: "",
  playlistModal: false,
  addPlaylistModal: false,
  noteModal: false,
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(VideoReducer, initialState);

  const handleWatchLater = (videoId) => {
    const updatedVideos = state.video?.map((video) =>
      video._id === videoId
        ? { ...video, watchLater: video?.watchLater ? false : true }
        : video
    );
    dispatch({ type: UPDATE_VIDEO, payload: updatedVideos });
  };

  const handleAddPlaylistVideo = (playlistId, videoId) => {
    const selectedPlaylist = state.playlists?.find(
      ({ _id }) => _id === playlistId
    );

    const isAvailable = selectedPlaylist?.videos?.join(",").includes(videoId);

    if (isAvailable) {
      toast.error("Already exists");
    } else {
      const updatedPlaylist = state?.playlists?.map((item) =>
        item._id === playlistId
          ? { ...item, videos: [...item.videos, videoId] }
          : item
      );
      dispatch({ type: UPDATE_PLAYLIST, payload: updatedPlaylist });
      toast.success("Added to playlist");
    }
  };

  const handlePlaylistVideoRemove = (playlistId, videoId) => {
    const updatedPlaylist = state.playlists?.map((item) =>
      item._id === playlistId
        ? { ...item, videos: item?.videos?.filter((play) => play !== videoId) }
        : item
    );
    dispatch({ type: UPDATE_PLAYLIST, payload: updatedPlaylist });
  };

  const handleNote = (videoId, newNote, noteId) => {
    if (noteId) {
      console.log(noteId);
      const updatedVideos = state.video?.map((vid) =>
        vid._id === videoId
          ? {
              ...vid,
              note: vid.note?.filter((note) => note._id !== noteId),
            }
          : vid
      );
      console.log(updatedVideos);
      dispatch({ type: UPDATE_VIDEO, payload: updatedVideos });
    } else {
      const updatedVideos = state.video?.map((vid) =>
        vid._id === videoId
          ? {
              ...vid,
              note: vid?.note?.length > 0 ? [...vid?.note, newNote] : [newNote],
            }
          : vid
      );
      dispatch({ type: UPDATE_VIDEO, payload: updatedVideos });
    }
  };

  const handleEditNote = (videoId, newNote) => {
    const updatedVideos = state.video?.map((vid) =>
      vid._id === videoId
        ? {
            ...vid,
            note: vid.note?.map((note) =>
              note._id === newNote._id
                ? { ...note.note, note: newNote.note }
                : note
            ),
          }
        : vid
    );
    dispatch({ type: UPDATE_VIDEO, payload: updatedVideos });
  };

  useEffect(() => {
    localStorage.setItem("um-video-data", JSON.stringify(state.video));
    localStorage.setItem("um-playlist-data", JSON.stringify(state.playlists));
  }, [state.video, state.playlists]);

  return (
    <DataContext.Provider
      value={{
        state,
        dispatch,
        handleWatchLater,
        handleAddPlaylistVideo,
        handlePlaylistVideoRemove,
        handleEditNote,
        handleNote,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
