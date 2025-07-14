import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home/Home";
import Album from "./pages/Album/Album";
import Sidebar from "./components/Others/Sidebar/Sidebar";
import MusicPlayer from "./pages/MusicPlayer/MusicPlayer";
import Navbar from "./components/Others/Navbar/Navbar";
import SongPage from "./pages/Song/SongPage";
import Artist from "./pages/Artist/Artist";
import SmallScreenBlocker from "./components/Others/SmallScreenBlocker/SmallScreenBlocker";

import ErrorSection from "./components/ErrorPage/Error";
import "./App.css";
import Library from "./pages/Library/Library";

export default function App() {
  const [currentSong, _setCurrentSong] = useState(null);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [recentlyPlayed, setRecentlyPlayed] = useState(() => {
    const stored = localStorage.getItem("recentlyPlayed");
    return stored ? JSON.parse(stored) : [];
  });

  // Wrapper for setting current song AND updating recently played
  const handleSetCurrentSong = (song) => {
    if (!song) return;

    _setCurrentSong(song);

    setRecentlyPlayed((prev) => {
      const filtered = prev.filter((s) => s.id !== song.id);
      const updated = [song, ...filtered];
      return updated.slice(0, 20);
    });
  };

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("recentlyPlayed");
    if (saved) {
      setRecentlyPlayed(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("recentlyPlayed", JSON.stringify(recentlyPlayed));
  }, [recentlyPlayed]);

  return (
    <div className="app">
      <Router>
        {/* <Sidebar /> */}

        <SmallScreenBlocker></SmallScreenBlocker>

        <div className="app-container">
          <Navbar setCurrentSong={handleSetCurrentSong} />

          <Routes>
            <Route
              path="/"
              element={
                <Home
                  currentSong={currentSong}
                  setCurrentSong={handleSetCurrentSong}
                  recentlyPlayed={recentlyPlayed}
                />
              }
            />

            <Route
              path="/album/:albumId"
              element={
                <Album
                  currentSong={currentSong}
                  setCurrentSong={handleSetCurrentSong}
                  queue={queue}
                  setQueue={setQueue}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                />
              }
            />

            {/* <Route
              path="/song/:id"
              element={
                <SongPage
                  currentSong={currentSong}
                  setCurrentSong={handleSetCurrentSong}
                />
              }
            /> */}

            <Route
              path="/artist/:id"
              element={
                <Artist
                  currentSong={currentSong}
                  setCurrentSong={handleSetCurrentSong}
                />
              }
            />

            {/* <Route path="/library" element={<Library />}></Route> */}

            {/* Wildcard route for unmatched URLs */}
            <Route path="*" element={<ErrorSection />} />
          </Routes>
        </div>

        {currentSong && (
          <MusicPlayer
            currentSong={currentSong}
            setCurrentSong={handleSetCurrentSong}
            queue={queue}
            setQueue={setQueue}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            isLoop={isLoop}
            setIsLoop={setIsLoop}
            isShuffle={isShuffle}
            setIsShuffle={setIsShuffle}
          />
        )}
      </Router>
    </div>
  );
}
