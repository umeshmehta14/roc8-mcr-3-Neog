import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./Pages/Home/Home";
import SideBar from "./Components/SideBar/SideBar";
import CategoryDisplay from "./Pages/Category Display/CategoryDisplay";
import SingleVideo from "./Pages/SingleVideo Page/SingleVideo";
import Explore from "./Pages/Explore/Explore";
import WatchLater from "./Pages/WatchLater/WatchLater";
import Playlist from "./Pages/Playlist/Playlist";
import { Toaster } from "react-hot-toast";
import PlaylistVideo from "./Pages/Playlist Video/PlaylistVideo";

function App() {
  return (
    <div className="App">
      <SideBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/watchLater" element={<WatchLater />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/category/:categoryName" element={<CategoryDisplay />} />
          <Route path="/playlist/:playlistId" element={<PlaylistVideo />} />
          <Route path="/video/:videoId" element={<SingleVideo />} />
        </Routes>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
