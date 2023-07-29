import React from "react";
import "./CategoryDisplay.css";
import { useParams } from "react-router-dom";
import { useData } from "../../Contexts/DataContext";
import MainVideoCard from "../../Components/MainVideo Card/MainVideoCard";

const CategoryDisplay = () => {
  const { categoryName } = useParams();

  const {
    state: { video },
  } = useData();

  const selectedCategory = video?.filter(
    ({ category }) => category === categoryName
  );

  return (
    <div className="home-box">
      <h1>{categoryName}</h1>
      <div className="video-listing">
        {selectedCategory?.map((vid) => (
          <MainVideoCard key={vid?._id} video={vid} />
        ))}
      </div>
    </div>
  );
};

export default CategoryDisplay;
