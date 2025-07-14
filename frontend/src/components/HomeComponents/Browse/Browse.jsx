import { useEffect, useState } from "react";
import "./Browse.css";

import Explore from "../Explore/Explore";

export default function Browse({
  currentSong,
  setCurrentSong,
  recentlyPlayed,
}) {
  const [randomSongs, setRandomSongs] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [trendingSongs, setTrendingSongs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/randomSongs")
      .then((res) => res.json())
      .then(setRandomSongs)
      .catch((err) => console.error("Random songs fetch failed:", err));

    fetch("http://localhost:3001/newReleases")
      .then((res) => res.json())
      .then(setNewReleases)
      .catch((err) => console.error("New releases fetch failed:", err));

    fetch("http://localhost:3001/globalTrending")
      .then((res) => res.json())
      .then(setTrendingSongs)
      .catch((err) => console.error("Trending songs fetch failed:", err));
  }, []);

  return (
    <div className="browse">
      <span className={`fitter ${currentSong ? "with-song" : "without-song"}`}>
        <Explore
          newReleases={newReleases}
          randomSongs={randomSongs}
          trendingSongs={trendingSongs}
          setCurrentSong={setCurrentSong}
          recentlyPlayed={recentlyPlayed}
        />
      </span>
    </div>
  );
}
