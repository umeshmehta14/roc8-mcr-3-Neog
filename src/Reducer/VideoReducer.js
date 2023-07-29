import {
  REMOVE_PLAYLIST,
  SET_ADD_PLAYLIST_MODAL,
  SET_NOTE_MODAL,
  SET_PLAYLIST_DATA,
  SET_PLAYLIST_MODAL,
  SET_SEARCH,
  UPDATE_PLAYLIST,
  UPDATE_VIDEO,
} from "./Constants";

export const VideoReducer = (state, { payload, type }) => {
  switch (type) {
    case UPDATE_VIDEO:
      return { ...state, video: payload };

    case SET_SEARCH:
      return { ...state, searchKey: payload };

    case SET_PLAYLIST_MODAL:
      return { ...state, playlistModal: !state.playlistModal };

    case SET_PLAYLIST_DATA:
      return { ...state, playlists: [...state.playlists, payload] };

    case REMOVE_PLAYLIST:
      return {
        ...state,
        playlists: state?.playlists?.filter(({ _id }) => _id !== payload),
      };

    case SET_ADD_PLAYLIST_MODAL:
      return { ...state, addPlaylistModal: !state.addPlaylistModal };

    case SET_NOTE_MODAL:
      return { ...state, noteModal: !state.noteModal };

    case UPDATE_PLAYLIST:
      return { ...state, playlists: payload };

    default:
      return state;
  }
};
