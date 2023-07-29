import React from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../Contexts/DataContext";
import MainVideoCard from "../../Components/MainVideo Card/MainVideoCard";
import { AiOutlineClose } from "../../Icons/Icons";
import "./PlaylistVideo.css";

const PlaylistVideo = () => {
  const { playlistId } = useParams();

  const {
    state: { playlists, video },
    handlePlaylistVideoRemove,
  } = useData();

  const selectedPlaylist = playlists?.find(({ _id }) => _id === playlistId);

  const albums = video?.filter(({ _id }) =>
    selectedPlaylist?.videos?.join(",").includes(_id)
  );

  return (
    <main className="home-box">
      <h1>{selectedPlaylist?.title}</h1>
      <div className="video-listing">
        {albums?.map((video) => (
          <div key={video._id} className="pl-vdo-card">
            <AiOutlineClose
              title="Remove"
              onClick={() => handlePlaylistVideoRemove(playlistId, video._id)}
            />
            <MainVideoCard video={video} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default PlaylistVideo;
