import "./MusicInfo.css";
import { useNavigate } from "react-router-dom";

export default function MusicInfo({ currentSong }) {
  const navigate = useNavigate();
  const handleSongPage = (song) => {
    navigate(`/song/${song.id || song.videoId}`);
  };

  return (
    <div className="music-info">
      <img
        className="mvp-img"
        src={currentSong?.thumbnail || currentSong?.albumThumbnail}
      />
      <div className="mvp-details">
        <p className="mvp-title">{currentSong?.title}</p>
        <p className="mvp-artist">{currentSong?.artist}</p>
        {(currentSong?.album || currentSong?.albumTitle) && (
          <p className="mvp-artist mvp-album">
            {currentSong.album || currentSong.albumTitle || "Single"}
          </p>
        )}
      </div>
    </div>
  );
}
