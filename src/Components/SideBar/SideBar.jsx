import React from "react";
import "./SideBar.css";
import { NavLink } from "react-router-dom";

import {
  AiFillHome,
  AiFillCompass,
  AiFillClockCircle,
  MdPlaylistAdd,
} from "../../Icons/Icons";

const SideBar = () => {
  const getStyle = ({ isActive }) => (isActive ? { color: "#509ecf" } : {});
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink style={getStyle} to={"/"}>
            <AiFillHome />
            <strong>Home</strong>
          </NavLink>
        </li>
        <li>
          <NavLink style={getStyle} to={"/explore"}>
            <AiFillCompass />
            <strong>Explore</strong>
          </NavLink>
        </li>
        <li>
          <NavLink style={getStyle} to="/playlist">
            <MdPlaylistAdd />
            <strong>Playlists</strong>
          </NavLink>
        </li>
        <li>
          <NavLink style={getStyle} to="/watchLater">
            <AiFillClockCircle />
            <strong>Watch Later</strong>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
