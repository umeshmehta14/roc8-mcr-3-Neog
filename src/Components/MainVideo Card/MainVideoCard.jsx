import React from "react";
import "./MainVideoCard.css";
import { AiOutlineClockCircle, AiFillClockCircle } from "../../Icons/Icons";
import { useNavigate } from "react-router-dom";
import { useData } from "../../Contexts/DataContext";

const MainVideoCard = ({ video }) => {
  const { _id, thumbnail, title, views, creator, watchLater } = video;

  const navigate = useNavigate();
  const {
    state: { category },
  } = useData();

  const videoCategory = category?.find(
    ({ category }) => category === video?.category
  );

  return (
    <div
      className="main-video-card"
      onClick={() => navigate(`/video/${_id}?category=${video?.category}`)}
    >
      {watchLater ? <AiFillClockCircle /> : <AiOutlineClockCircle />}
      <img src={thumbnail} alt={title} className="vdo-detail-img" />
      <div className="vdo-detail">
        <section className="vdo-avatar">
          <img src={videoCategory?.thumbnail} alt={title} />
        </section>
        <section className="vdo-info">
          <strong>{title}</strong>
          <strong>{video?.category}</strong>
          <small>
            {views} | {creator}
          </small>
        </section>
      </div>
    </div>
  );
};

export default MainVideoCard;
