import "./SongCard.css";
import { useNavigate } from "react-router-dom";

export default function SongCard({ song, setCurrentSong }) {
  const navigate = useNavigate();

  const handleSongPage = (e) => {
    e.stopPropagation();
    navigate(`/song/${song.id || song.videoId}`);
  };

  return (
    <div className="song-card" onClick={() => setCurrentSong(song)}>
      <div className="song-img1">
        <img src={song.thumbnail} alt={song.title} />
      </div>
      <div className="song-info">
        <span className="song-artist-container">
          <p className="song-title">{song.title}</p>
        </span>
        <span className="song-artist-container">
          <p className="song-artist">
            {song.artist || song.year || song.title}
          </p>
        </span>
      </div>
    </div>
  );
}
