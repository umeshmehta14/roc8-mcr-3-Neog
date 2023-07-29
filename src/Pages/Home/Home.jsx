import React from "react";
import { useData } from "../../Contexts/DataContext";

import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const {
    state: { category },
  } = useData();

  const navigate = useNavigate();

  return (
    <div className="home-box">
      <h1 className="heading">Category</h1>
      <div className="video-listing">
        {category?.map((cate) => {
          const { _id, category, thumbnail } = cate;
          return (
            <div
              key={_id}
              className="category-card"
              onClick={() => navigate(`/category/${category}`)}
            >
              <img src={thumbnail} alt={category} />
              <strong className="category-name">{category}</strong>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
