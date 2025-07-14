import "./SongBoxTwo.css";
import SongCard from "../../UI/SongCard/SongCard";

export default function SongBoxTwo({
  songData,
  activeTab,
  setActiveTab,
  setCurrentSong,
}) {
  const artistName = songData?.artists?.[0]?.name || "Unknown Artist";

  return (
    <div className="song-box2">
      <div className="song-box-header">
        <button
          onClick={() => setActiveTab("lyrics")}
          className={`song-box-header-btns ${
            activeTab === "lyrics" ? "song-box-active" : ""
          }`}
        >
          Lyrics
        </button>
        <button
          onClick={() => setActiveTab("credits")}
          className={`song-box-header-btns ${
            activeTab === "credits" ? "song-box-active" : ""
          }`}
        >
          Credits
        </button>
        <button
          onClick={() => setActiveTab("more")}
          className={`song-box-header-btns ${
            activeTab === "more" ? "song-box-active" : ""
          }`}
        >
          More like This
        </button>
      </div>

      <div className="song-box-divider" />

      {/* Lyrics Tab */}
      {activeTab === "lyrics" && (
        <div className="song-box-lyrics">
          {songData?.lyrics?.lyrics || "Lyrics not available."}
        </div>
      )}

      {/* Credits Tab */}
      {activeTab === "credits" && (
        <div className="song-box-credits">
          <span className="song-box-credits-info song-box-performed-by">
            <p className="song-box-same-heading">Performed By</p>
            <p className="song-box-same-paragraph">{artistName}</p>
          </span>
        </div>
      )}

      {/* More Like This Tab */}
      {activeTab === "more" && (
        <div className="song-box-more-like-this">
          {songData?.relatedSongs?.length > 0 ? (
            songData.relatedSongs.map((song) => (
              <SongCard
                key={song.videoId}
                song={song}
                setCurrentSong={setCurrentSong}
              />
            ))
          ) : (
            <p>No similar songs found.</p>
          )}
        </div>
      )}
    </div>
  );
}
