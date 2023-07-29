import React from "react";
import { useData } from "../../Contexts/DataContext";
import MainVideoCard from "../../Components/MainVideo Card/MainVideoCard";

const WatchLater = () => {
  const {
    state: { video },
  } = useData();

  const watchLater = video?.filter(({ watchLater }) => watchLater);
  return (
    <div className="home-box">
      <h1>Watch Later</h1>
      <div className="video-listing">
        {watchLater.length > 0 ? (
          watchLater?.map((vid) => <MainVideoCard key={vid._id} video={vid} />)
        ) : (
          <h1>No Watch Later Yet</h1>
        )}
      </div>
    </div>
  );
};

export default WatchLater;
