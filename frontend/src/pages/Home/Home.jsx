import Browse from "../../components/HomeComponents/Browse/Browse";
import "./Home.css";
import {
  getCachedData,
  setCachedData,
} from "../../components/Utility/cache.js";

import { useState, useEffect } from "react";

export default function Home({ currentSong, setCurrentSong, recentlyPlayed }) {
  const [newReleases, setNewReleases] = useState([]);
  const [globalTrending, setGlobalTrending] = useState([]);
  const [randomSongs, setRandomSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const newReleaseCache = getCachedData("newReleases");
      const trendingCache = getCachedData("globalTrending");
      const randomCache = getCachedData("randomSongs");

      if (newReleaseCache) setNewReleases(newReleaseCache);
      else {
        const res = await fetch("http://localhost:3001/newReleases");
        const data = await res.json();
        setNewReleases(data);
        setCachedData("newReleases", data);
      }

      if (trendingCache) setGlobalTrending(trendingCache);
      else {
        const res = await fetch(
          "http://localhost:3001/globalTrending"
        );
        const data = await res.json();
        setGlobalTrending(data);
        setCachedData("globalTrending", data);
      }

      if (randomCache) setRandomSongs(randomCache);
      else {
        const res = await fetch("http://localhost:3001/randomSongs");
        const data = await res.json();
        setRandomSongs(data);
        setCachedData("randomSongs", data);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="home">
      <Browse
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        recentlyPlayed={recentlyPlayed}
      />
    </div>
  );
}
