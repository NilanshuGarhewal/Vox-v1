import "./Explore.css";
import BrowseContain from "../BrowseContain/BrowseContain";

export default function Explore({
  randomSongs,
  newReleases,
  trendingSongs,
  setCurrentSong,
  recentlyPlayed,
}) {
  return (
    <div className="explore">
      <div className="home-name">
        <p>Browse</p>
      </div>

      <BrowseContain
        songs={newReleases}
        setCurrentSong={setCurrentSong}
        heading={"Made For You"}
      />
      {recentlyPlayed.length > 0 && (
        <BrowseContain
          songs={recentlyPlayed}
          setCurrentSong={setCurrentSong}
          heading={"Recently Played"}
        />
      )}
      <BrowseContain
        songs={randomSongs}
        setCurrentSong={setCurrentSong}
        heading={"Newly Released"}
      />
      <BrowseContain
        songs={trendingSongs}
        setCurrentSong={setCurrentSong}
        heading={"Trending In Your Region"}
      />
    </div>
  );
}
