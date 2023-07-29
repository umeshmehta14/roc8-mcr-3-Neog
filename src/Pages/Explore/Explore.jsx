import React from "react";

import "./Explore.css";
import { useData } from "../../Contexts/DataContext";
import MainVideoCard from "../../Components/MainVideo Card/MainVideoCard";
import { SET_SEARCH } from "../../Reducer/Constants";
import { SearchVideo } from "../../Utils/SearchVideo";

const Explore = () => {
  const {
    state: { video, searchKey },
    dispatch,
  } = useData();

  const displayVideo = SearchVideo(video, searchKey);
  console.log(displayVideo);
  return (
    <div className="home-box">
      <h1>Explore</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search Video By Title"
          onChange={({ target }) =>
            dispatch({ type: SET_SEARCH, payload: target.value })
          }
        />
      </div>
      <section className="video-listing">
        {displayVideo?.map((vid) => (
          <MainVideoCard key={vid._id} video={vid} />
        ))}
      </section>
    </div>
  );
};

export default Explore;
